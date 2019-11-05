import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {Facet, Field} from '../../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PathResolverService} from '../../../../pharos-services/path-resolver.service';

/**
 * table to display selectable fields
 */
@Component({
  selector: 'pharos-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.scss']
})
export class FacetTableComponent implements OnInit, OnDestroy {

  /**
   * facet to display fields of
   */
  @Input() facet: Facet;

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
  displayColumns: string [] = ['select', 'name', 'value'];
  /**
   *object fields headings to track and show
   * @type {string[]}
   */
  fieldColumns: string [] = ['name', 'value'];

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
   * @param {ActivatedRoute} route
   * @param {ChangeDetectorRef} ref
   * @param {PathResolverService} pathResolverService
   */
  constructor(private route: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService) { }

  // todo: on redirect (click targets button), the checked boxes remain

  /**
   * retrieve and set facet values, subscribe to changes
   */
  ngOnInit() {

    // sets initially selected values in service
     this.pathResolverService.mapToFacets(this.route.snapshot.queryParamMap);

    // TODO this fires for each facet in the list, even though the same selected facet is returned
    /**
     * this tracks which facets are selected, based on the url path
     */
    this.pathResolverService.facets$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
      res.filter(facetObj =>
        facetObj.facet === this.facet.facet).forEach(filtered => {
          this.propogate = false;
        this.filterSelection.select(...filtered.values);
      }
    );
        this.propogate = true;
      });
    this.ref.markForCheck();
    this.dataSource.data = this.facet.values;

    /**
     * this changes the facets that are mapped to the url path in the service
     */
    this.filterSelection.changed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
          if (this.propogate === true) {
            this.pathResolverService.setFacets({name: this.facet.facet, change: change});
            this.pathResolverService.navigate();
          }
         });
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

