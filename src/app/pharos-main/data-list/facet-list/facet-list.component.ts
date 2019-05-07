import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PathResolverService} from "../../../pharos-services/path-resolver.service";
import {Facet} from "../../../models/facet";

/**
 * panel to show selected facets or queries, and remove them
 */
@Component({
  selector: 'pharos-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.scss']
})

export class FacetListComponent implements OnInit {
  /**
   * list of selected facets
   */
  facets: any[];

  constructor(private _route: ActivatedRoute,
              private pathResolverService: PathResolverService) {
  }

  ngOnInit() {
    this.pathResolverService.facets$.subscribe(res => this.facets = res);
    this._route.queryParamMap.subscribe(res => this.pathResolverService.mapToFacets(res));
  }

  removefacetFamily(facet: any): void {
    this.pathResolverService.removefacetFamily(facet);
    this.pathResolverService.navigate();
  }

  removeField(facet: any, field: string): void {
    this.pathResolverService.removeField(facet, field);
    this.pathResolverService.navigate();
  }

  removeAll(): void {
    this.pathResolverService.removeAll();
  }
}
