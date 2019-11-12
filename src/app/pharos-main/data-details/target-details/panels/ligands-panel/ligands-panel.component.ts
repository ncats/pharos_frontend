import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Ligand, LigandSerializer} from '../../../../../models/ligand';
import {PageData} from '../../../../../models/page-data';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {DiseaseSerializer} from '../../../../../models/disease';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';

/**
 * panel to generically display ligands as a pageable list of ligand cards
 */
@Component({
  selector: 'pharos-ligands-panel',
  templateUrl: './ligands-panel.component.html',
  styleUrls: ['./ligands-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandsPanelComponent extends DynamicPanelComponent implements OnInit {
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
  constructor(
    private navSectionsService: NavSectionsService,
              private _http: HttpClient,
              private _route: ActivatedRoute,
              private pharosApiService: PharosApiService,
              private changeRef: ChangeDetectorRef,
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
        this.target = this.data.targets;
        this.loading = false;

      });
  }

  /**
   * paginate ligand list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loading = true;
    const ligandSerializer = new LigandSerializer();
    const pageParams = {
      ligandtop: event.pageSize,
      ligandskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.fetchMore(this._route.snapshot.data.path, pageParams).valueChanges.subscribe(res => {
      console.log(res);
      this.target.ligands = res.data.targets.ligands;
      this.changeRef.markForCheck();
    });
  }
  /**
   * filters out ligand activity values
   * uses ligand serializer to map ligand object
   * @param {any[]} data
   * @private
   */
/*
  private _mapLigands(data: any[]): void {
    const acc: string = this.target.gene;
    const ligandsArr: Ligand[] = [];
    data.forEach(ligand => {
      const activity: any = ligand.links
        .filter(link => link.kind === 'ix.idg.models.Target')
        .filter(link => link.properties.filter(prop => prop.term === acc).length > 0)
        .map(target => this._getActivity(target));
      // .sort(activity => activity.target !== this.target.gene);
      const strucProp = ligand.links.filter(link => link.kind === 'ix.core.models.Structure')[0];
      let lig: Ligand;
      if (strucProp) {
        const refid: string = strucProp.refid;
         lig = this.ligandSerializer.fromJson({
          name: ligand.name,
          refid: refid,
          activities: activity,
          imageUrl: `${this._STRUCTUREURLBASE}${refid}.svg?size=250`,
          internalLink: ['/ligands', ligand.id]
        });
      } else {
         lig = this.ligandSerializer.fromJson({
          name: ligand.name,
          imageUrl: null,
          activities: activity,
          internalLink: ['/ligands', ligand.id]
        });
      }

      ligandsArr.push(lig);
    });
    this.ligandsList = ligandsArr;
    this.loading = false;
  }

  /!**
   * filters ligand activities from a ligand object
   * @param ligand
   * @return {any}
   * @private
   *!/
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
*/

  /**
   * checks to see if the display section is within view
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
