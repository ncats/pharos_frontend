import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Publication} from '../../../../../models/publication';
import {HttpClient} from '@angular/common/http';
import {takeUntil, takeWhile} from 'rxjs/operators';

/**
 * displays assay data
 * todo not really tested
 */
@Component({
  selector: 'pharos-assay-panel',
  templateUrl: './assay-panel.component.html',
  styleUrls: ['./assay-panel.component.css']
})
export class AssayPanelComponent extends DynamicPanelComponent implements OnInit, AfterViewInit {
  /**
   * columns to display
   * @type {string[]}
   */
  displayColumns: string[] = ['pubchem', 'type', 'active', 'inconclusive', 'inactive', 'name'];

  /**
   * map of assays
   * @type {Map<string, any>}
   */
  assayMap: Map<string, any> = new Map<string, any>();

  /**
   * assay data source
   * @type {MatTableDataSource<Publication[]>}
   */
  dataSource = new MatTableDataSource<Publication[]>();

  /**
   *  Paginator object from Angular Material
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * set up dependencies
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {HttpClient} _http
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private _http: HttpClient) {
    super();
  }

  /**
   * subscribe to data changes
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
          this.loading = false;
        }
      });
  }

  /**
   * initialize paginator
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // todo generic table was unable to update - this is either from a problem in material or the nested async calls
  // todo use rxjs to merge calls and return (some examples have 89+ results though)

  /**
   * set table data
   */
  setterFunction() {
    const tableArr = [];
    this.data.assays.forEach(assay => {
      if (assay.href && !this.assayMap.get(assay.id)) {
        this._http.get<any>(assay.href + '?view=full').subscribe(res => {
          this.assayMap.set(assay.id, res);
          tableArr.push({
            type: res.type,
            name: res.name,
            active: res.properties.filter(p => p.label === 'MLP Assay Active')[0].intval,
            inactive: res.properties.filter(p => p.label === 'MLP Assay Inactive')[0].intval,
            inconclusive: res.properties.filter(p => p.label === 'MLP Assay Inconclusive')[0].intval,
            pubchem: res.properties.filter(p => p.label === 'MLP Assay PubChem ID')[0].intval
          });
          this.dataSource.data = tableArr;
        });
      }
    });
  }
}
