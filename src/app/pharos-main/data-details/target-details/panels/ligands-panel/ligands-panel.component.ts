import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges,
  OnInit, ViewChild
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Ligand, LigandSerializer} from '../../../../../models/ligand';
import {PageData} from '../../../../../models/page-data';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from '../../../../../../config/pharos-config';

/**
 * panel to generically display ligands as a pageable list of ligand cards
 */
@Component({
  selector: 'pharos-ligands-panel',
  templateUrl: './ligands-panel.component.html',
  styleUrls: ['./ligands-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandsPanelComponent extends DynamicPanelComponent implements OnInit, OnChanges, AfterViewInit {
  /**
   * Paginator object from Angular Material
   * */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * target object
   */
  @Input() target: Target;

  /**
   * data source used to page the ligand list
   * @type {MatTableDataSource<Ligand>}
   */
  dataSource: MatTableDataSource<Ligand> = new MatTableDataSource<Ligand>();

  /**
   * page data object to track pagination
   */
  pageData: PageData;

  /**
   * url for the structure lookup url
   */
  private _STRUCTUREURLBASE: string;

  /**
   * serializer to map ligands
   * @type {LigandSerializer}
   */
  ligandSerializer: LigandSerializer = new LigandSerializer();

  ligandsList: any[] = [];

  /**
   * most of these dependencies handle the pagination of the data
   *
   * calls super object constructor
   * sets default structure url
   *
   * @param {NavSectionsService} navSectionsService
   * @param {ChangeDetectorRef} changeDetector
   * @param {HttpClient} _http
   * @param {ChangeDetectorRef} ref
   * @param {PharosConfig} pharosConfig
   */
  constructor(private navSectionsService: NavSectionsService,
              private changeDetector: ChangeDetectorRef,
              private _http: HttpClient,
              private ref: ChangeDetectorRef,
              private pharosConfig: PharosConfig) {
    super();
    this._STRUCTUREURLBASE = this.pharosConfig.getStructureImageUrl();
  }

  /**
   * todo pagination might still be a little slow, as the first load is not paginated
   * subscribe to data changes and set data when it arrives
   */
  ngOnInit() {
    console.log(this);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data[this.field] && this.data[this.field].length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
        }
      });
  }

  ngOnChanges (change) {
    if(this.paginator) {
      this.setPage();
    }
  }

  /**
   * set the sort and paginators
   * since the total is not know, it needs to be manually set based on the page data passes in
   */
  ngAfterViewInit() {
    this.setPage();
  }

  /**
   * create page data object and map data
   */
  setterFunction(): void {
    this.pageData = new PageData(
      {
        top: 10,
        skip: 0,
        total: this.data.count,
        count: 10
      });
    this._mapLigands(this.data[this.field]);
    this.setPage();
    this.changeDetector.markForCheck();
  }

  /**
   * call api to get next page of ligands and map the response
   * @param $event
   */
  paginate($event) {
    const path: string = this.pharosConfig.getApiPath();
    const acc: string = this.target.accession;
    const url = `${path}targets/${acc}/${this.field}?skip=${($event.pageIndex) * $event.pageSize}&top=${$event.pageSize}&view=full`;
    this.loading = true;
    this._http.get<Ligand[]>(
      url)
      .subscribe(res => {
        this._mapLigands(res);
        this.loading = false;
      });
  }

  /**
   * filters out ligand activity values
   * uses ligand serializer to map ligand object
   * @param {any[]} data
   * @private
   */
  private _mapLigands(data: any[]): void {
    const ligandsArr: Ligand[] = [];
    data.forEach(ligand => {
      console.log(ligand);
      const activity: any = ligand.links
        .filter(link => link.kind === 'ix.idg.models.Target')
        .map(target => this._getActivity(target));
      // .sort(activity => activity.target !== this.target.gene);
      const strucProp = ligand.links.filter(link => link.kind === 'ix.core.models.Structure')[0];
      console.log(strucProp);
      let lig: Ligand;
      if(strucProp) {
        const refid: string = strucProp.refid;
         lig = this.ligandSerializer.fromJson({
          name: ligand.name,
          refid: refid,
          activities: activity,
          imageUrl: `${this._STRUCTUREURLBASE}${refid}.svg?size=250`,
          internalUrl: `/idg/ligands/${ligand.id}`
        });
      } else {
         lig = this.ligandSerializer.fromJson({
          name: ligand.name,
          imageUrl: null,
          activities: activity,
          internalUrl: `/idg/ligands/${ligand.id}`
        });
      }
      console.log(lig);
      ligandsArr.push(lig);
    });
    console.log(ligandsArr);
    this.ligandsList = ligandsArr;
  }

  /**
   * set default paginator values
   */
  setPage() {
    if (this.paginator && this.pageData) {
      console.log(this.pageData);
      this.paginator.length = this.pageData.total;
      this.paginator.pageSize = this.pageData.top;
      this.paginator.pageIndex = Math.ceil(this.pageData.skip / this.pageData.top);
    }
  }

  /**
   * filters ligand activities from a ligand object
   * @param ligand
   * @return {any}
   * @private
   */
  private _getActivity(ligand: any): any {
    let otherActivity: any;
    const ret: any[] = [];
    const na = {label: 'N/A', numval: ''};
    ligand.properties.filter(prop => {
      if (prop.label === 'Ligand Activity') {
        otherActivity = {
          activity: ligand.properties.filter(p => p.label === prop.term)[0],
          target: ligand.properties.filter(p => p.label === 'IDG Target')[0].term,
          targetFamily: ligand.properties.filter(p => p.label === 'IDG Target Family')[0].term,
          idgLevel: ligand.properties.filter(p => p.label === 'IDG Development Level')[0].term,
        };
      } else if (prop.label === 'Pharmalogical Action') {
        otherActivity = {
          activity: prop,
          target: ligand.properties.filter(p => p.label === 'IDG Target')[0].term,
          targetFamily: ligand.properties.filter(p => p.label === 'IDG Target Family')[0].term,
          idgLevel: ligand.properties.filter(p => p.label === 'IDG Development Level')[0].term,
        };
      }
    });
    return otherActivity ? otherActivity : na;
  }


  /**
   * checks to see if the display section is within view
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
