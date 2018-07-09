import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {Field} from '../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';

/**
 * table to display selectable fields
 */
@Component({
  selector: 'pharos-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.css'],
//  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetTableComponent implements OnInit, OnDestroy {

  /**
   * facet to display fields of
   */
  @Input() facet: any;

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
  displayColumns: string [] = ['select', 'label', 'count'];
  /**
   *object fields headings to track and show
   * @type {string[]}
   */
  fieldColumns: string [] = ['label', 'count'];

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

  constructor(private route: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService) { }

  // todo: on redirect (click targets button), the checked boxes remain

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
        facetObj.facet.toLowerCase() === this.facet.name.toLowerCase()).forEach(filtered => {
          this.propogate = false;
        this.filterSelection.select(...filtered.fields);
      }
    );
        this.propogate = true;
      });
  this.dataSource.data = this.facet.values;

    /**
     * this changes the facets that are mapped to the url path in the service
     */
    this.filterSelection.onChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
          if (this.propogate === true) {
            this.pathResolverService.mapSelection({name: this.facet.name, change: change});
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
    return item.label;
  }

  filterFacet(q: string): void {
  console.log(q);
  }


  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

