import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationExtras, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {Facet, Field} from '../../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PathResolverService} from '../path-resolver.service';
import {SelectedFacetService} from '../selected-facet.service';

/**
 * table to display selectable fields
 */
@Component({
  selector: 'pharos-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetTableComponent implements OnInit, OnDestroy {

  /**
   * facet to display fields of
   */
  @Input() facet: Facet;

  @Input() values: Field[];

  /**
   * data source of filters to display in the table
   * @type {MatTableDataSource<any>}
   */
  dataSource = new MatTableDataSource<any>([]);

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  filterSelection = new SelectionModel<string>(true, []);

  /**
   * facet selection fields to display
   * @type {string[]}
   */
  displayColumns: string [] = ['select', 'name', 'count'];
  /**
   *object fields headings to track and show
   * @type {string[]}
   */
  fieldColumns: string [] = ['name', 'count'];

  /**
   * unsubscribe subject
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  /**
   * boolean to track facets selection - without this flag, the facet selection triggers a constant change
   * @type {boolean}
   */
  propogate = true;

  /**
   * add route and change tracking dependencies
   * @param _route
   * @param router
   * @param changeRef
   * @param selectedFacetService
   * @param {PathResolverService} pathResolverService
   */
  constructor(private _route: ActivatedRoute,
              private router: Router,
              private changeRef: ChangeDetectorRef,
              private selectedFacetService: SelectedFacetService,
              private pathResolverService: PathResolverService) {
  }

  // todo: on redirect (click targets button), the checked boxes remain

  /**
   * retrieve and set facet values, subscribe to changes
   */
  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalize the component
        if (e instanceof NavigationEnd) {
          // update field values
          this.dataSource.data = this.facet.values;
          // update selected fields
          this.mapSelected();
          this.changeRef.markForCheck();
        }
      });
    // update field values
    this.dataSource.data = this.facet.values;
    // update selected fields
    this.mapSelected();

    /**
     * this changes the facets that are mapped to the url path in the service
     */
    this.filterSelection.changed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
        if (this.propogate === true) {
          console.log(change);
          this.selectedFacetService.setFacets({name: this.facet.facet, change: change});
          const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
          if (this.facet.facet === 'collection') {
            this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getFacetByName('collection'));
          } else {
            this.pathResolverService.navigate(queryParams, this._route);
          }
        }
      });
  }

  mapSelected() {
    const selected: Facet = this.selectedFacetService.getFacetByName(this.facet.facet);
    if (selected) {
      this.propogate = false;
      this.filterSelection.select(...selected.values.map(val => val.name));
      this.propogate = true;
    } else {
      this.propogate = false;
      this.filterSelection.clear();
      this.propogate = true;
    }
  }

  /**
   * track facet changes to avoid unnecessary changes
   * @param index
   * @param {Field} item
   * @returns {string}
   */
  trackByFunction(index, item: Field) {
    return item.name;
  }

  /**
   * filter facets by query
   * todo implement this
   * @param {string} q
   */
  filterFacet(q: string): void {
    // console.log(q);
  }


  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

