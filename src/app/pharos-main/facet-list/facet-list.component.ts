import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PathResolverService} from "../../pharos-services/path-resolver.service";

@Component({
  selector: 'pharos-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.css']
})
export class FacetListComponent implements OnInit {
  facets: any[];

  constructor(private _route: ActivatedRoute,
              private pathResolverService: PathResolverService) {
  }

  ngOnInit() {
    this.pathResolverService.facets$.subscribe(res => this.facets = res);
    this._route.queryParamMap.subscribe(res => {
      this.pathResolverService.mapToFacets(res);
    })
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
