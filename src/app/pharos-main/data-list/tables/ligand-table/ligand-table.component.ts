import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {PageData} from '../../../../models/page-data';
import {PharosConfig} from '../../../../../config/pharos-config';
import {Ligand} from '../../../../models/ligand';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FieldSelectionDialogComponent} from '../../../../tools/field-selection-dialog/field-selection-dialog.component';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {LigandCardComponent} from '../../cards/ligand-card/ligand-card.component';

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

/**
 * table/list view of ligand overviews
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatPaginatorModule, LigandCardComponent],
  selector: 'pharos-ligand-table',
  templateUrl: './ligand-table.component.html',
  styleUrls: ['./ligand-table.component.scss']
})
export class LigandTableComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  path = 'ligands';

  ligands: Ligand[];

  associatedStructure: string;
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
   * url for structure rendering
   */
  private _STRUCTUREURLBASE: string;

  /**
   * set up config and change detection
   * @param _route
   * @param router
   * @param ref
   * @param {PharosConfig} pharosConfig
   */
  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private pharosConfig: PharosConfig,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  /**
   * set image url and subscribe to data changes
   */
  ngOnInit() {
    this._STRUCTUREURLBASE = this.pharosConfig.getStructureImageUrl();
    this._data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(d => {
      if (this.data && this.data.ligands) {
        this.associatedStructure = this._route.snapshot.queryParamMap.get('associatedStructure');
        this.pageData = new PageData({
          top: this._route.snapshot.queryParamMap.has('rows') ? +this._route.snapshot.queryParamMap.get('rows') : 10,
          skip: (+this._route.snapshot.queryParamMap.get('page') - 1) * +this._route.snapshot.queryParamMap.get('rows'),
          total: this.data.count
        });
        this.ligands = this.data.ligands;
        this.loadingComplete(false);
        this.ref.detectChanges();
      }
    });
  }

  /**
   * this changes the sort order
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
    this.paginationChanges($event);
    // this.pageChange.emit($event);
  }

  /**
   * change pages of list
   * @param event
   */
  paginationChanges(event: any) {
    navigationExtras.queryParams = {
      page: event.pageIndex + 1,
      rows: event.pageSize
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

  downloadData() {
    this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: this.pageData.total, model: 'Ligand', route: this._route},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
