import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck,
  EventEmitter,
  Injector,
  Input, IterableDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ComponentPortal, PortalModule} from '@angular/cdk/portal';
import {PageData} from './models/page-data';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataProperty} from './components/property-display/data-property';
import {SelectionModel} from '@angular/cdk/collections';
import {takeUntil} from 'rxjs/operators';
import {MatRow, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PropertyDisplayComponent} from './components/property-display/property-display.component';
import {MatIconModule} from '@angular/material/icon';

/**
 * component to show flexible data consisting of multiple data types, custom components
 * also handles standard table operations, primarily with event emitters for the end user to react to
 */
@Component({
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatCheckboxModule, PortalModule, PropertyDisplayComponent, MatIconModule
  ],
  selector: 'pharos-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

/**
 * Generic table Component that iterates over a list of {@link TableData} options to display fields
 */
export class GenericTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, DoCheck {

  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

  /**
   * initialize a private variable _data, it's a BehaviorSubject
   *
   */
  protected _data = new BehaviorSubject<any>(null);

  /**
   * pushes changed data to {BehaviorSubject}
   */
  @Input()
  set data(value: any) {
    this._data.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   */
  get data(): any {
    return this._data.getValue();
  }

  /**
   * sets up config fields as a behavior subject
   * @type {BehaviorSubject<DataProperty[]>}
   * @private
   */
  protected _fieldsConfig: BehaviorSubject<DataProperty[]> = new BehaviorSubject<DataProperty[]>(null);

  /**
   * pushes changed data to {BehaviorSubject}
   */
  @Input()
  set fieldsConfig(value: DataProperty[]) {
    this._fieldsConfig.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   */
  get fieldsConfig(): DataProperty[] {
    return this._fieldsConfig.getValue();
  }

  /**
   * sets up page data as a behavior subject
   * @type {BehaviorSubject<PageData>}
   * @private
   */
  protected _rowSelectConfig: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * pushes changed data to {BehaviorSubject}
   */
  @Input()
  set selectableRows(value: boolean) {
    this._rowSelectConfig.next(value);
    this.fetchTableFields();
  }

  /**
   * returns value of {BehaviorSubject}
   */
  get selectableRows(): boolean {
    return this._rowSelectConfig.getValue();
  }

  @Input() pageData: PageData;
  @Input() defaultPageSize = 10;
  /**
   * gets placeholder expanded row outlets
   */
  @ViewChildren('expandedRowOutlet', {read: ViewContainerRef}) rowOutlet: QueryList<ViewContainerRef>;

  /** boolean to toggle completion of page loading
   * todo: currently not used
   */
  loading = false;

  /**
   * show/hide the paginator
   */
  @Input() showPaginator = true;


  @Input() useInternalPaginator = false;

  /**
   * show/hide the bottom paginator
   */
  @Input() showBottomPaginator = false;

  /**
   * Sort object from Angular Material
   */
  @ViewChild(MatSort, {static: true}) _sort: MatSort;

  /**
   * generated string array of fields that are to be displayed in the table
   */
  displayColumns: string[];

  /**
   * generated  array of DataProperties that are to be displayed in the table
   */
  displayFields: DataProperty[];


  /**
   * whether or not to allow the user to change the size of the page/ show dropdown
   */
  @Input() hidePageSize = false;

  /**
   * Input to toggle if the table should have expandable rows
   * boolean
   */
  @Input() expandable = true;

  /**
   * This compares each row of the table to the "expanded element - if they are equal, the row is expanded
   *  todo: this only allows one open at a time, this might need to be a map to allow multiple expanded rows
   */
  expandedElement: any | null;

  /**
   * event that emits when the sort value or direction is changed. The parent component will be responsible for
   * fetching and returning the new sorted data
   */
  @Output() readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();

  /**
   * event that emits when the page is changed. The parent component will be responsible for
   * fetching and returning the new data
   */
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * event that emits when the page is changed. The parent component will be responsible for
   * fetching and returning the new data
   */
  @Output() readonly rowClick: EventEmitter<MatRow> = new EventEmitter<MatRow>();

  /**
   * main table datasource
   * @type {MatTableDataSource<any>}
   */
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /**
   * whether to toggle the condensed class to make a more compact table
   * @type {boolean}
   */
  @Input() condensed = false;

  @Input() asDataSource = false;

  @Output() rowSelectionChange: EventEmitter<SelectionModel<any>> = new EventEmitter<SelectionModel<any>>();

  selection = new SelectionModel<any>(true, []);

  iterableDiffer: any;

  /**
   * Paginator object from Angular Material
   *
   */
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @Input() highlightFunction = (row) => {
    return false;
  }

  ngDoCheck() {
    if (this.iterableDiffer.diff(this.data)) {
      this.data = this.data;
    }
  }
  /**
   * injector for custom data
   */
  constructor(
    private ref: ChangeDetectorRef,
    private _injector: Injector,
    iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  /**
   * Init: get the columns to be displayed.
   * Table data is tracked by the data getter and setter
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        if (this.useInternalPaginator) {
          this.dataSource = new MatTableDataSource<any>(res);
          this.pageData = new PageData({total: res.length});
        } else {
          this.dataSource.data = res;
        }
        this.ref.detectChanges();
      });

    this._fieldsConfig
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => this.fetchTableFields());

    this.selection.changed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
        this.ref.detectChanges();
        this.rowSelectionChange.emit(this.selection);
      });
  }

  ngOnChanges(change) {

  }

  /**
   * set the sort and paginators
   * since the total is not know, it needs to be manually set based on the page data passes in
   */
  ngAfterViewInit() {
    /*    if (this.fieldsConfig) {
          const defaultSort = this.fieldsConfig.filter(field => field.sorted);
          if (defaultSort.length > 0) {
            this.data.sort.active = defaultSort[0].name;
            this.data.sort.direction = defaultSort[0].sorted;
          }
        }*/
  }

  /**
   * used to track data changes
   * @param {number} index
   * @param item
   * @return {any}
   */
  trackByFn(index: number, item: any) {
    return (item.name && item.name.term) ? item.name.term : item;
  }

  /**
   * emit sort change events
   * @param sort
   */
  changeSort(sort: Sort): void {
    this.sortChange.emit(sort);
    this.ref.detectChanges();
  }

  /**
   * emit page change events or use internal paginator
   * @param $event
   */
  changePage($event): void {
    this.pageChange.emit($event);
  }

  /**
   * Returns readable label for a data field
   */
  getLabel(name: string): string {
    let ret = '';
    this.displayFields.forEach(field => {
      if (field.name === name) {
        ret = field.label;
      }
    });
    return ret;
  }

  /**
   * Check to see if a column is designed to be sortable
   */
  isSortable(name: string): boolean {
    let ret = false;
    this.displayFields.forEach(field => {
      if (field.name === name) {
        ret = field.sortable;
      }
    });
    return ret;
  }

  /**
   * sets a flat array of the {@link DataProperty} fields
   */
  fetchTableFields(): void {
    this.displayColumns = [];
    this.displayFields = this.fieldsConfig.filter(field => !!field.visible);
    if (!this.displayFields.length) {
      this.displayFields = this.fieldsConfig;
    }
    if (this.selectableRows) {
      this.displayColumns = ['select'].concat(this.displayFields.map(field => field.name));
      //  this.ref.reattach();
      this.ref.detectChanges();
    } else {
      this.displayColumns = this.displayFields.map(field => field.name);
      this.ref.detectChanges();
    }
  }


  /**
   * get display columns
   * todo - probably unnecessary after the removal of the default buttons column
   */
  fetchDisplayColumns(): string[] {
    return this.displayColumns;
  }

  /**
   * forces to boolean a check to see if a field has a custom component associated with it
   * @param field
   */
  checkCustomComponent(field: DataProperty): boolean {
    return !!field.customComponent;
  }

  /**
   * creates a custom component inside a table field currently the specific field data, substance object and expanded row
   * container are sent to the custom component
   * todo: the comtainer and object should be optional fields
   * todo: table injected components need to implement an interface to get the substance or container
   * @param field
   * @param row
   * @param index
   */
  getCustomComponent(field: DataProperty, row: MatRow, index: number): ComponentPortal<any> {
    if (this.rowOutlet) {
      if (field.customComponent) {
        const comp = this._injector.get<Type<any>>(field.customComponent);
        return new ComponentPortal(comp);
      }
    }
  }

  /**
   * this fires once the custom comoponent above is created. Here is where listeners can be added to react to requests
   * from the injected component
   * this gives access to the injected component instance
   * @param component
   * @param index
   * @param field
   */
  componentAttached(component: any, index?: number, field?: DataProperty) {
    if (component.instance.data === null && this.data[index][field.name]) {
      component.instance.data = this.data[index][field.name];
    }

    if (component.instance.object) {
      component.instance.object = this.data[index];
    }
    if (component.instance.container) {
      component.instance.container = this.rowOutlet.toArray()[index];

    }
    if (component.instance.parent) {
      component.instance.parent = this.data[index];

    }
    if (component.instance.clickEvent) {
      component.instance.clickEvent
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(res => {
        this.cellClicked(res);
      });
    }

    if (component.instance.ref) {
      // todo this is still problematic because injected components are redrawn.
      this.ref.detach();
    }
  }

  /**
   * expand row on cell click
   * @param {MatRow} row
   */
  cellClicked(row: MatRow): void {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  /**
   * emit row when clicked on
   * @param {MatRow} row
   */
  rowClicked(row: MatRow): void {
    this.rowClick.emit(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.ref.detectChanges();

  }

  getFieldValue(row, field) {
    return row[field];
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
