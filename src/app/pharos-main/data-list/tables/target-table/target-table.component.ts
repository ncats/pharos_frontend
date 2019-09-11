import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../models/page-data';
import {BatchUploadModalComponent} from '../../../../tools/batch-upload-modal/batch-upload-modal.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NavigationExtras, Router} from '@angular/router';
import {PharosConfig} from '../../../../../config/pharos-config';
import {PharosProperty} from '../../../../models/pharos-property';
import {Target, TargetSerializer} from '../../../../models/target';
import * as firebase from 'firebase/app';
import {TargetSaveModalComponent} from './target-save-modal/target-save-modal.component';
import {PharosProfileService} from '../../../../auth/pharos-profile.service';


/**
 * token to inject structure viewer into generic table component
 * @type {InjectionToken<any>}
 */
export const IDG_LEVEL_TOKEN = new InjectionToken('IDGLevelComponent');

/**
 * token to inject structure viewer into generic table component
 * @type {InjectionToken<any>}
 */
export const RADAR_CHART_TOKEN = new InjectionToken('RadarChartComponent');


/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

/**
 * display targets in a filterable list view
 */
@Component({
  selector: 'pharos-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class TargetTableComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path = 'targets';
  /**
   * columns to display in table
   * @type {string[]}
   */
  displayColumns: string[] = ['name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  // displayColumns: string[] = ['list-select', 'name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];

  /**
   * fields to be show in the pdb table
   * @type {PharosProperty[]}
   */
  fieldsData: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Target Name',
      width: '35vw'
    }),
    new PharosProperty({
      name: 'gene',
      label: 'Gene',
      width: '10vw'
    }),
    new PharosProperty({
      name: 'idgTDL',
      label: 'Development Level',
      customComponent: IDG_LEVEL_TOKEN,
      width: '10vw'
    }),
    new PharosProperty({
      name: 'idgFamily',
      label: 'Target Family',
      width: '10vw'
    }),
    new PharosProperty({
      name: 'novelty',
      label: 'Log Novelty',
      sortable: true,
      width: '7vw'
    }),
    new PharosProperty({
      name: 'jensenScore',
      label: 'Pubmed Score',
      sortable: true,
      width: '7vw'
    }),
    new PharosProperty({
      name: 'antibodyCount',
      label: 'Antibody Count',
      sortable: true,
      width: '7vw'
    }),
    new PharosProperty({
      name: 'ppiCount',
      label: 'Protein Protein Interactions',
      sortable: true,
      width: '5vw'
    }),
    new PharosProperty({
      name: 'knowledgeAvailability',
      label: 'Knowledge Availability',
      customComponent: RADAR_CHART_TOKEN,
      sortable: true,
      width: '8vw'
    })
  ];

  /**
   * main list of paginated targets
   */
 targets: Target[];

  /**
   * event emitter of sort event on table
   * @type {EventEmitter<string>}
   */
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * event emitter for page change on table
   * @type {EventEmitter<string>}
   */
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;

  /**
   * boolean to show or hide the large "targets" label
   * @type {boolean}
   */
  @Input() showLabel = true;

  /**
   * show the colored toolbar, which includes target list functionality
   * @type {boolean}
   */
  @Input() showToolbar = true;

  /**
   * checks for mobile view to toggle small card view
   * @type {boolean}
   */
  isSmallScreen = false;

  /**
   * selection model for when rows are selectable in table, used for compare and storing targets
   * @type {SelectionModel<any>}
   */
  rowSelection = new SelectionModel<any>();

  targetSerializer: TargetSerializer = new TargetSerializer();

  targetObjs: Target[];

  loggedIn = false;

  user: any;

  /**
   * set up dependencies
   * @param {MatDialog} dialog
   * @param {HttpClient} http
   * @param {Router} router
   * @param profileService
   * @param {PharosConfig} pharosConfig
   * @param {ChangeDetectorRef} ref
   * @param {BreakpointObserver} breakpointObserver
   */
  constructor(public dialog: MatDialog,
              public http: HttpClient,
              private router: Router,
              private profileService: PharosProfileService,
              private pharosConfig: PharosConfig,
              private ref: ChangeDetectorRef,
              public breakpointObserver: BreakpointObserver) {
    super();
  }

  /**
   * check for mobile view,
   * subscribe to data changes
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

    this.profileService.profile$.subscribe(user => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
        this.ref.markForCheck();
        // User is signed in.
      } else {
        this.loggedIn = false;
        this.ref.markForCheck();
        // No user is signed in.
      }
    });

    this._data
    // listen to data as long as term is undefined or null
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data.length) {
          this.targetObjs = this.data
            .map(target => this.targetSerializer.fromJson(target));
          this.targets = this.targetObjs
            .map(target => target = this.targetSerializer._asProperties(target));
          this.ref.detectChanges();
        }
      });
  }

  /**
   * send table sort event to emitter, external component handles sorting
   * @param $event
   */
  changeSort($event): void {
    this.sortChange.emit($event);
  }

  /**
   * send table page event to emitter, external component handles paging
   * @param $event
   */
  changePage($event): void {
    console.log($event)
    this.pageChange.emit($event);
  }

  /**
   * create and open batch upload dialog,
   * fetch results on close and redirect to search by etag
   */
  batchUpload() {
    const dialogRef = this.dialog.open(BatchUploadModalComponent, {
        height: '75vh',
        width: '66vw',
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'text/plain',
        })
      };
      this.http.post(`${this.pharosConfig.getApiPath()}targets/resolve`, result.join(), httpOptions).subscribe(res => {
        navigationExtras.queryParams = {
          q: `etag:${res['etag']}`
        };
        this._navigate(navigationExtras);
      });
    });
  }

  /**
   * navigate to search with etag after batch upload
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);

  }

  /**
   * stub for target comparison
   * todo: implement
   */
  compareTargets() {
    console.log(this.rowSelection.selected);
  }

  /**
   * stub for topic creation
   * todo: implement
   */
  createTopic() {
    console.log(this.rowSelection.selected);
  }

  /**
   * stub for target list saving
   * todo: implement
   */
  saveTargets() {
    const targetList = this.rowSelection.selected.map(target => target = target.accession.term);
    const dialogRef = this.dialog.open(TargetSaveModalComponent, {
        height: '50vh',
        width: '50vw',
        data: {
          selection: targetList,
          user: this.user
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'text/plain',
        })
      };
    });
  }

  saveQuery() {
    const targetList = this.rowSelection.selected.map(target => target = target.accession.term);
    const dialogRef = this.dialog.open(TargetSaveModalComponent, {
        height: '50vh',
        width: '50vw',
        data: {
          etag: this.etag,
          sideway: this.sideway,
          user: this.user,
          count: this.pageData.total
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'text/plain',
        })
      };
    });
  }

  setSelectedTargets(selection) {
    this.rowSelection  = selection;
  }

  /**
   * clean up
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
