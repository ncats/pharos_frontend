import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {Facet} from '../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';

/**
 * panel to show selected facets or queries, and remove them
 */
@Component({
  selector: 'pharos-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.scss']
})

export class FacetListComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * list of selected facets
   */
  @Input() facets: Facet[];

  /**
   * set up route watching
   * @param {ActivatedRoute} _route
   * @param {PathResolverService} pathResolverService
   */
  constructor(private _route: ActivatedRoute,
              private pathResolverService: PathResolverService) {
    super();
  }

  /**
   * set up subscriptions for fetching facets and watching route changes
   */
  ngOnInit() {
    console.log(this);
/*    this.facets = this.pathResolverService.getFacetsAsObjects();
    /!*this.pathResolverService.facets$.subscribe(res => {
      console.log(res);
      this.facets = res;
    });*!/
    this._route.queryParamMap.subscribe(res => {
      console.log(res);
      this.pathResolverService.mapToFacets(res)
      this.facets = this.pathResolverService.getFacetsAsObjects();

    });*/
    const fArr = this._route.snapshot.queryParamMap.get('facet').split('/');
    const facetName: string = fArr[0].replace(/\+/g, ' ');
    const fieldName: string = decodeURI(fArr[1])
      .replace('%2F', '/')
      .replace('%2C', ',')
      .replace('%3A', ':');
    console.log(fieldName);
    this.facets = [new Facet({facet: facetName, values: [{name: fieldName}]})];

   // this.pathResolverService.mapToFacets(this._route.snapshot.queryParamMap);

    // TODO this fires for each facet in the list, even though the same selected facet is returned
    /**
     * this tracks which facets are selected, based on the url path
     */
   /* this.pathResolverService.facets$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        console.log(res);
        /!*}
          res.filter(facetObj =>
            facetObj.facet === this.facet.facet).forEach(filtered => {
              this.propogate = false;
              this.filterSelection.select(...filtered.values);
            }
          );*!/
      });*/
      }

  /**
   * remove a specific facet and all selected fields
   * @param facet
   */
  removefacetFamily(facet: any): void {
    this.pathResolverService.removefacetFamily(facet);
    this.pathResolverService.navigate();
  }

  /**
   * remove single field from a facet
   * @param facet
   * @param {string} field
   */
  removeField(facet: any, field: string): void {
    this.pathResolverService.removeField(facet, field);
    this.pathResolverService.navigate();
  }

  /**
   * clear all queries/facets
   */
  removeAll(): void {
    this.pathResolverService.removeAll();
  }

  ngOnDestroy(): void {
    this.facets = [];
   // this.removeAll();
  }
}
