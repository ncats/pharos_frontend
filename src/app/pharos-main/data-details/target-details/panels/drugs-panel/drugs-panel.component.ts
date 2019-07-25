import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges,
  OnInit, ViewChild, ViewChildren
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
 * panel to generically display drugs as a pageable list of drug cards
 */
@Component({
  selector: 'pharos-drugs-panel',
  templateUrl: './drugs-panel.component.html',
  styleUrls: ['./drugs-panel.component.scss']
})
export class DrugsPanelComponent extends DynamicPanelComponent implements OnInit, OnChanges, AfterViewInit {
  /**
   * Paginator object from Angular Material
   * */
  @ViewChild('drugPaginator', {read: MatPaginator, static: false}) set matPaginator(mp: MatPaginator) {
    this.drugPaginator = mp;
    this.setPage();
  }

  drugPaginator: MatPaginator;

  /**
   * target object
   */
  @Input() target: Target;

  /**
   * data source used to page the drug list
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
   * serializer to map drugs
   * @type {LigandSerializer}
   */
  drugSerializer: LigandSerializer = new LigandSerializer();

  drugsList: any[] = [];

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
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data[this.field] && this.data[this.field].length > 0) {
          this.pageData = new PageData(
            {
              top: 10,
              skip: 0,
              total: this.data.drugscount,
              count: 10
            });
          this.ngUnsubscribe.next();
          this.setterFunction();
        }
      });
  }

  ngOnChanges (change) {
    if (this.drugPaginator) {
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

  /**s
   * create page data object and map data
   */
  setterFunction(): void {
    this._mapDrugs(this.data[this.field]);
    this.loading = false;
    this.changeDetector.markForCheck();
  }

  /**
   * call api to get next page of drugs and map the response
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
        this._mapDrugs(res);
        this.pageData.skip = $event.pageIndex * $event.pageSize;
      });
  }

  /**
   * filters out drug activity values
   * uses drug serializer to map drug object
   * @param {any[]} data
   * @private
   */
  private _mapDrugs(data: any[]): void {
    const drugsArr: Ligand[] = [];
    data.forEach(drug => {
      const activity: any = drug.links
        .filter(link => link.kind === 'ix.idg.models.Target')
        .map(target => this._getActivity(target));
      // .sort(activity => activity.target !== this.target.gene);
      const strucProp = drug.links.filter(link => link.kind === 'ix.core.models.Structure')[0];
      let lig: Ligand;
      if (strucProp) {
        const refid: string = strucProp.refid;
         lig = this.drugSerializer.fromJson({
          name: drug.name,
          refid: refid,
          activities: activity,
          imageUrl: `${this._STRUCTUREURLBASE}${refid}.svg?size=250`,
           internalLink: ['/ligands', drug.id]
        });
      } else {
         lig = this.drugSerializer.fromJson({
          name: drug.name,
          imageUrl: null,
          activities: activity,
           internalLink: ['/ligands', drug.id]
        });
      }
      drugsArr.push(lig);
    });
    this.drugsList = drugsArr;
  }

  /**
   * set default paginator values
   */
  setPage() {
    /*if (this.pageData) {
      this.drugPaginator.length = this.pageData.total;
      this.drugPaginator.pageSize = this.pageData.top;
      this.drugPaginator.pageIndex = Math.ceil(this.pageData.skip / this.pageData.top);
    }*/
  }

  /**
   * filters drug activities from a drug object
   * @param drug
   * @return {any}
   * @private
   */
  private _getActivity(drug: any): any {
    let otherActivity: any;
    const ret: any[] = [];
    const na = {label: 'N/A', numval: ''};
    drug.properties.filter(prop => {
      if (prop.label === 'Ligand Activity') {
        otherActivity = {
          activity: drug.properties.filter(p => p.label === prop.term)[0],
          target: drug.properties.filter(p => p.label === 'IDG Target')[0].term,
          targetFamily: drug.properties.filter(p => p.label === 'IDG Target Family')[0].term,
          idgLevel: drug.properties.filter(p => p.label === 'IDG Development Level')[0].term,
        };
      } else if (prop.label === 'Pharmalogical Action') {
        otherActivity = {
          activity: prop,
          target: drug.properties.filter(p => p.label === 'IDG Target')[0].term,
          targetFamily: drug.properties.filter(p => p.label === 'IDG Target Family')[0].term,
          idgLevel: drug.properties.filter(p => p.label === 'IDG Development Level')[0].term,
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
