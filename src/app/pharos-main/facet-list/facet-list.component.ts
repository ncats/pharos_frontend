import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Facet} from "../../models/facet";

@Component({
  selector: 'pharos-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.css']
})
export class FacetListComponent implements OnInit {
facets: any[];
facetMap: Map<string, string[]> = new Map<string, string[]>();

  constructor(private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
   // this._router.
    this._route.queryParamMap.subscribe(res => {
      const fList = res.getAll('facet');
      fList.forEach(facet => {
        const fArr = facet.split('/');
        let facetName: string = fArr[0].replace(/\+/g, ' ');
        let fieldName: string = decodeURI(fArr[1]).replace('%2F', '/');
        let fields = this.facetMap.get(facetName);
        if (fields) {
          fields.push(fieldName);
          this.facetMap.set(facetName, Array.from(new Set(fields)));
        } else {
          this.facetMap.set(facetName, [fieldName]);
        }
      });
      this.flattenMap();
    })
  }

  flattenMap(): void {
    console.log(this.facetMap);
    this.facets = [];
    this.facetMap.forEach((value, key)=>{
      this.facets.push({facet:key, fields: value});
    })
  }

  removefacetFamily(facet: any ): void {
    this.facetMap.delete(facet.facet);
    this.flattenMap();
    this._navigate();
  }

  removeField(facet: any, field: string ): void {
    console.log(field);
    let ffields = this.facetMap.get(facet).filter(fField => fField === field);
    if(ffields.length > 0){
      this.facetMap.set(facet, ffields);
    } else {
      this.facetMap.delete(facet);
    }
    this.flattenMap();
    this._navigate();
  }

  private _navigate(): void {
    const facetListKeep = [];
    const removed: string[] = [];
    this.facets.forEach(facet => facet.fields.map(field => facetListKeep.push(this._makeFacetString(facet.facet, field))));
    const prev = this._route.snapshot.queryParamMap.getAll('facet');
    let facetList: string[] = prev ? prev : [];
    console.log(facetListKeep);
    console.log(facetList);
    facetListKeep.forEach(remField => facetList = facetList.filter(field => field !== remField));
      console.log(facetList);
      const navigationExtras: NavigationExtras = {
        queryParams: {facet: facetList}
      };
      this._router.onSameUrlNavigation ='reload'; //forces reload since technically, this is the same navigation url
      this._router.navigate([], navigationExtras);
    }

  private _makeFacetString(facet: string, field: string): string {
      return facet.replace(/ /g, '+') + '/' + encodeURIComponent(field.toString())
    }

}
