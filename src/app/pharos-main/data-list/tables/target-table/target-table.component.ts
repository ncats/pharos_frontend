import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../models/page-data';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {PharosConfig} from '../../../../../config/pharos-config';
import {Target} from '../../../../models/target';
import {PharosProfileService} from '../../../../auth/pharos-profile.service';
import {TopicSaveModalComponent} from './topic-save-modal/topic-save-modal.component';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';
import {CentralStorageService} from '../../../../pharos-services/central-storage.service';

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
   * holds the gene that is used as the binding partner for the current target list
   */
  associatedTarget = '';
  associatedDisease = '';
  associatedStructure = '';
  associatedLigand = '';
  /**
   * main list of paginated targets
   */
  @Input() targets: Target[];

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;

  /**
   * checks for mobile view to toggle small card view
   * @type {boolean}
   */
  isSmallScreen = false;

  /**
   * selection model for when rows are selectable in table, used for compare and storing targets
   * @type {SelectionModel<any>}
   */
  rowSelection: SelectionModel<any>;

  similarityTarget: Target;

  loggedIn = false;

  user: any;
  /**
   * set up dependencies
   * @param _route
   * @param {MatDialog} dialog
   * @param {Router} router
   * @param profileService
   * @param {PharosConfig} pharosConfig
   * @param {ChangeDetectorRef} ref
   * @param targetCollection
   * @param snackBar
   * @param {BreakpointObserver} breakpointObserver
   */
  constructor(private _route: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private profileService: PharosProfileService,
              private pharosConfig: PharosConfig,
              private ref: ChangeDetectorRef,
              private targetCollection: AngularFirestore,
              private snackBar: MatSnackBar,
              public breakpointObserver: BreakpointObserver,
              public dynamicServices: DynamicServicesService,
              private centralStorageService: CentralStorageService) {
    super(dynamicServices);
  }

  sortMap: Map<string, any>;

  defaultSortMap: Map<string, any> = new Map([
    ['Target Name', {sortKey: 'Name', order: 'asc'}],
    ['Gene', {sortKey: 'Symbol', order: 'asc'}],
    ['UniProt', {sortKey: 'UniProt', order: 'asc'}],
    ['Development Level', {sortKey: 'Target Development Level', order: 'desc'}],
    ['Family', {sortKey: 'Family', order: 'asc'}],
    ['Novelty', {sortKey: 'Novelty', order: 'desc'}],
    ['PubMed Score', {sortKey: 'PubMed Score', order: 'desc'}],
    ['Antibody Count', {sortKey: 'Antibody Count', order: 'desc'}]
  ]);

  ligandSortMap: Map<string, any> = new Map([
    ['Activity Value', {sortKey: 'Average Activity Value', order: 'desc'}],
    ['Action', {sortKey: 'Action', order: 'asc'}],
    ...this.defaultSortMap
  ]);

  structureSortMap: Map<string, any> = new Map([
    ['Predicted Activity', {sortKey: 'Predicted Activity', order: 'desc'}],
    ['Prediction Applicability', {sortKey: 'Prediction Applicability', order: 'desc'}],
    ['Prediction Training Activity', {sortKey: 'Prediction Training Activity', order: 'desc'}],
    ...this.defaultSortMap
  ]);

  structureLigandSortMap: Map<string, any> = new Map([
    ['Activity Value', {sortKey: 'Average Activity Value', order: 'desc'}],
    ['Action', {sortKey: 'Action', order: 'asc'}],
    ['Predicted Activity', {sortKey: 'Predicted Activity', order: 'desc'}],
    ['Prediction Applicability', {sortKey: 'Prediction Applicability', order: 'desc'}],
    ['Prediction Training Activity', {sortKey: 'Prediction Training Activity', order: 'desc'}],
    ...this.defaultSortMap
  ]);

  ppiSortMap: Map<string, any> = new Map([
    ['score', {sortKey: 'StringDB Interaction Score', order: 'desc'}],
    ['p_int', {sortKey: 'BioPlex Interaction Probability', order: 'desc'}],
    ['p_ni', {sortKey: 'BioPlex p_ni', order: 'desc'}],
    ['p_wrong', {sortKey: 'BioPlex p_wrong', order: 'desc'}],
    ...this.defaultSortMap
  ]);

  diseaseSortMap: Map<string, any> = new Map([
    ['JensenLab Text Mining zscore', {sortKey: 'JensenLab TextMining zscore', order: 'desc'}],
    ['JensenLab conf', {sortKey: 'JensenLab Confidence', order: 'desc'}],
    ['Expression Atlas log2foldchange', {sortKey: 'Expression Atlas Log2 Fold Change', order: 'desc'}],
    ['Expression Atlas pvalue', {sortKey: 'Associated Disease P-value', order: 'asc'}],
    ['DisGeNET score', {sortKey: 'DisGeNET Score', order: 'desc'}],
    ['Monarch S2O', {sortKey: 'Monarch S2O', order: 'desc'}],
    ...this.defaultSortMap
  ]);

  selectedSortObject: { sortKey, order };
  previousSortObject: { sortKey, order };

  sortChanged(sortObject: { sortKey, order }) {
    if (!sortObject) {
      delete this.previousSortObject;
      this.sortTargets();
    }
    const key = sortObject.sortKey;
    let order = sortObject.order;
    if (key === this.previousSortObject?.sortKey) {
      order = this.swapOrder(this.previousSortObject.order);
    }
    this.sortTargets(key, order);
  }

  toggleSortOrder() {
    this.sortTargets(this.previousSortObject.sortKey, this.swapOrder(this.previousSortObject.order));
  }

  sortTargets(sortKey?: string, direction?: string): void {
    this.previousSortObject = {sortKey, order: direction};
    if (sortKey) {
      const prefix = direction === 'asc' ? '^' : '!';
      navigationExtras.queryParams = {
        sortColumn: prefix + sortKey,
        page: null
      };
    } else {
      navigationExtras.queryParams = {
        sortColumn: null,
        page: null
      };
    }
    this._navigate(navigationExtras);
  }

  swapOrder(order: string) {
    if (order === 'desc') {
      return 'asc';
    }
    return 'desc';
  }


  /**
   * check for mobile view,
   * subscribe to data changes
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    this.rowSelection = this.centralStorageService.rowSelection;
    this.profileService.profile$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
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
    this.ref.markForCheck();


    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.associatedTarget = this._route.snapshot.queryParamMap.get('associatedTarget');
        this.associatedDisease = this._route.snapshot.queryParamMap.get('associatedDisease');
        this.associatedStructure = this._route.snapshot.queryParamMap.get('associatedStructure');
        this.associatedLigand = this._route.snapshot.queryParamMap.get('associatedLigand');
        if (this.associatedTarget) {
          this.sortMap = this.ppiSortMap;
        } else if (this.associatedDisease) {
          this.sortMap = this.diseaseSortMap;
        } else if (this.associatedStructure) {
          if (this.associatedLigand) {
            this.sortMap = this.structureLigandSortMap;
          } else {
            this.sortMap = this.structureSortMap;
          }
        } else if (this.associatedLigand) {
          this.sortMap = this.ligandSortMap;
        } else {
          this.sortMap = this.defaultSortMap;
        }
        if (this.data && this.data.targets) {
          this.pageData = new PageData({
            top: this._route.snapshot.queryParamMap.has('rows') ? +this._route.snapshot.queryParamMap.get('rows') : 10,
            skip: (+this._route.snapshot.queryParamMap.get('page') - 1) * +this._route.snapshot.queryParamMap.get('rows'),
            total: this.data.count
          });
          const navSortParam = this._route.snapshot.queryParamMap.get('sortColumn');
          if (navSortParam) {
            this.selectedSortObject = {sortKey: navSortParam.substring(1), order: navSortParam.substring(0, 1) === '^' ? 'asc' : 'desc'};
            this.previousSortObject = this.selectedSortObject;
          } else {
            this.selectedSortObject = null;
            this.previousSortObject = null;
          }
          this.targets = this.data.targets;
          this.similarityTarget = this.data.similarityTarget;
          this.ref.detectChanges();
        }
      });
  }

  compareSortKeys(key1, key2) {
    return key1 && key2 && key1.sortKey === key2.sortKey;
  }

  /**
   * send table page event to emitter, external component handles paging
   * @param $event
   */
  changePage($event): void {
    navigationExtras.queryParams = {
      page: $event.pageIndex + 1,
      rows: $event.pageSize
    };
    this._navigate(navigationExtras);
  }

  /**
   * navigate on changes, mainly just changes url, shouldn't reload entire page, just data
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
    // console.log(this.rowSelection.selected);
  }

  /**
   * stub for topic creation
   * todo: implement
   */
  createTopic() {
    const targetList = this.rowSelection.selected.map(target => target = target.accession);
    const dialogRef = this.dialog.open(TopicSaveModalComponent, {
        height: '50vh',
        width: '50vw',
        data: {
          title: 'Create Topic',
          selection: targetList,
          nameable: this.loggedIn,
          user: this.user,
          count: this.pageData.total
        }
      }
    );

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
      this.targetCollection.collection('target-collection').add(
        result
      ).then(doc => {
        if (this.loggedIn && result.saveList) {
          this.profileService.updateSavedCollection(doc.id);
        }
      });
    });
  }

  getSelected(target: Target) {
    return this.rowSelection.selected.find(t => {
      return t._tcrdid === target._tcrdid;
    });
  }

  isSelected(target: Target): boolean {
    return !!this.getSelected(target);
  }

  updateTargetSelection(target: Target, selected?: any) {
    if (selected) {
      if (!this.isSelected(target)) {
        this.rowSelection.select(target);
      }
    } else {
      this.rowSelection.deselect(this.getSelected(target));
    }
  }

  toggleAll($event: any) {
    if ($event.checked) {
      this.targets.forEach(t => {
        if (!this.isSelected(t)) {
          this.rowSelection.select(t);
        }
      });
    } else {
      // this.rowSelection.clear();
      this.targets.forEach(t => {
        this.rowSelection.deselect(this.getSelected(t));
      });
    }
  }

  clearAll() {
    this.rowSelection.clear();
  }

  selectionTooltip(): string {
    return this.rowSelection.selected.map(t => {
      return t.preferredSymbol;
    }).join(', ');
  }

  allSelected(): boolean {
    return this.countPageSelections() === this.targets.length;
  }

  someSelected(): boolean {
    const pageCount = this.countPageSelections();
    return pageCount > 0 && pageCount < this.targets.length;
  }

  countPageSelections() {
    let count = 0;
    for (let i = 0; i < this.targets.length; i++) {
      if (this.isSelected(this.targets[i])) {
        count++;
      }
    }
    return count;
  }

  selectAll() {

  }
}
