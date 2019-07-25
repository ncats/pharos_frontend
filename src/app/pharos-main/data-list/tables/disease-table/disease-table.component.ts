import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../models/page-data';
import {DynamicTablePanelComponent} from '../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {Target, TargetSerializer} from '../../../../models/target';
import {Disease, DiseaseSerializer} from '../../../../models/disease';
import {IDG_LEVEL_TOKEN, RADAR_CHART_TOKEN} from '../target-table/target-table.component';
import {PharosProperty} from '../../../../models/pharos-property';

/**
 * display a pageable/ sortable list of disease objects
 * extends dynamic panel to utilize data getters and setters
 */
@Component({
  selector: 'pharos-disease-table',
  templateUrl: './disease-table.component.html',
  styleUrls: ['./disease-table.component.css']
})
export class DiseaseTableComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  path = 'diseases';

  /**
   * fields to be show in the pdb table
   * @type {PharosProperty[]}
   */
  fieldsData: PharosProperty[] = [
    new PharosProperty({
      name: 'id',
      label: 'Disease ID',
      width: '10vw'
    }),
    new PharosProperty({
      name: 'name',
      label: 'Disease Name',
      width: '35vw'
    }),
    new PharosProperty({
      name: 'description',
      label: 'Description'
    })
  ];

  /**
   * total count of results
   * todo: not always accurate
   */
  @Input() total: number;

  /**
   * event emitter for when a table column sort is changed
   * @type {EventEmitter<string>}
   */
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * event emitter for when table pagination is changed
   * @type {EventEmitter<string>}
   */
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;

/*  /!**
   * material design datasource subject
   * @type {MatTableDataSource<any>}
   *!/
  dataSource = new MatTableDataSource<any>(this.data);*/

  /**
   * material design selection model for when the table becomes selectable
   * todo: add selectable row functionolity
   * @type {SelectionModel<any>}
   */
  rowSelection = new SelectionModel<any>(true, []);

  diseaseSerializer: DiseaseSerializer = new DiseaseSerializer();

  diseaseObjs: Disease[];
  diseases: any[];

  /**
   * no required services, call super object constructor
   */
  constructor() {
    super();
  }

  /**
   * subscribe to data observable, since the data changes on paging/filtering, only unsubscribe on destroy
   */
  ngOnInit() {

    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
       takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data.length) {
          this.diseaseObjs = this.data
            .map(disease => this.diseaseSerializer.fromJson(disease));
          const diseaseProps = this.diseaseObjs
            .map(disease => disease = this.diseaseSerializer._asProperties(disease));
          this.diseases = diseaseProps;
          this.loading = false;
        }
      });
  }

  /**
   * material design sorting change
   * emits to parent class {DataListComponent} to handle sorting
   * @param $event
   */
  changeSort($event): void {
    this.sortChange.emit($event);
  }

  /**
   * emit page change event
   * @param $event
   */
  changePage($event): void {
    this.pageChange.emit($event);
  }

  /**
   * unsubscribe from all subscriptions
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
