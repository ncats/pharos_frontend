import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../models/page-data';
import {DynamicTablePanelComponent} from '../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {Disease, DiseaseSerializer} from '../../../../models/disease';
import {PharosProperty} from '../../../../models/pharos-property';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FieldSelectionDialogComponent} from '../../../../tools/field-selection-dialog/field-selection-dialog.component';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';
import {MatDialog} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginator} from '@angular/material/paginator';
import {GenericTableComponent} from '../../../../tools/generic-table/generic-table.component';

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};
/**
 * display a pageable/ sortable list of disease objects
 * extends dynamic panel to utilize data getters and setters
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatPaginator, GenericTableComponent],
  selector: 'pharos-disease-table',
  templateUrl: './disease-table.component.html',
  styleUrls: ['./disease-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiseaseTableComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {
  firstFields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Disease Name',
      width: '35vw'
    }),
    new PharosProperty({
      name: 'mondoID',
      label: 'Mondo ID'
    }),
    new PharosProperty({
      name: 'associationCount',
      label: 'Associated Targets'
    }),
    new PharosProperty({
      name: 'directAssociationCount',
      label: 'Direct Associated Targets'
    })
  ];
  lastFields: PharosProperty[] = [
    new PharosProperty({
      name: 'gard_rare',
      label: 'Rare',
      checkbox: true
    })
  ];
  /**
   * fields to be show in the pdb table
   * @type {PharosProperty[]}
   */
  fieldsData: PharosProperty[] = [
    ...this.firstFields, ...this.lastFields
  ];

  fieldsDataWithTarget: PharosProperty[] = [
    ...this.firstFields,
    new PharosProperty({
      name: 'datasource_count',
      label: 'Data Source Count'
    }),
    ...this.lastFields
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

  associatedTarget: string;

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
  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private router: Router,
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  /**
   * subscribe to data observable, since the data changes on paging/filtering, only unsubscribe on destroy
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (this.data) {
          this.associatedTarget = this._route.snapshot.queryParamMap.get('associatedTarget');
          this.pageData = new PageData({
            top: this._route.snapshot.queryParamMap.has('rows') ? +this._route.snapshot.queryParamMap.get('rows') : 10,
            skip: (+this._route.snapshot.queryParamMap.get('page') - 1) * +this._route.snapshot.queryParamMap.get('rows'),
            total: this._route.snapshot.data.results.count
          });
          this.diseases = this.data.diseases;
          this.diseaseObjs = this.data.diseasesProps;
          this.changeRef.detectChanges();
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
    this.paginationChanges($event);
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
      data: {count: this.pageData.total, model: 'Disease', route: this._route},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
