import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NavigationExtras, ParamMap, Router} from '@angular/router';

@Injectable()
export class PathResolverService {
  private _facets: any[] = [];
  private _facetMap: Map<string, string[]> = new Map<string, string[]>();

  private _pathSource = new BehaviorSubject<string>('targets');
  private _facetSource = new BehaviorSubject<any[]>(this._facets);
  path$ = this._pathSource.asObservable();
  facets$ = this._facetSource.asObservable();
  constructor(private _router: Router) { }

  setPath(path: string): void {
    this._pathSource.next(path);
  }

  navigate() {
    const facetList = [];
    this._facets.forEach(facet => facet.fields.map(field => facetList.push(this._makeFacetString(facet.facet, field))));

    // forces to first page on facet changes
    const navigationExtras: NavigationExtras = {
      queryParams: {facet: facetList.length > 0 ? facetList : null,
                    top: null,
                    skip: null},
      queryParamsHandling: ''
    };

    this._router.onSameUrlNavigation = 'reload'; // forces reload since this is the same navigation url
    this._router.navigate([], navigationExtras);
  }

  // converts a facet name and field into url readable string
  private _makeFacetString(facet: string, field: string): string {
    return facet.replace(/ /g, '+') + '/' + encodeURIComponent(field.toString());
  }

  // this converts previous queries into an array of object that can be consumed by a component
  mapToFacets(map: ParamMap): void {
   const fList = map.getAll('facet');
    fList.forEach(facet => {
      const fArr = facet.split('/');
      const facetName: string = fArr[0].replace(/\+/g, ' ');
      const fieldName: string = decodeURI(fArr[1]).replace('%2F', '/');
      const fields = this._facetMap.get(facetName);
      if (fields) {
        fields.push(fieldName);
        this._facetMap.set(facetName, Array.from(new Set(fields)));
      } else {
        this._facetMap.set(facetName, [fieldName]);
      }
    });
    let qList = map.getAll('q');
    // this cleans up the emtpy searches that return blank facets
    if (qList.length > 0) {
      qList = qList.map(q => q.replace(/"/g, '').replace(/\+/g, ' '));
      this._facetMap.set('query', qList);
    }
    this._flattenMap();
  }

  mapSelection(facet: any): void {
    const fields = this._facetMap.get(facet.facet);
    if (fields) {
      fields.push(...facet.fields);
      this._facetMap.set(facet.facet, Array.from(new Set(fields)));
    } else {
      this._facetMap.set(facet.facet, facet.fields);
    }
  this._flattenMap();
  }

  private _flattenMap(): void {
    this._facets = [];
    this._facetMap.forEach((value, key) => {
      this._facets.push({facet: key, fields: value});
    });
    this._facetSource.next(this._facets);
  }

  removefacetFamily(facet: any ): void {
    this._facetMap.delete(facet.facet);
    this._flattenMap();
  }

  removeField(facet: any, field: string ): void {
    const ffields = this._facetMap.get(facet).filter(fField => fField !== field);
    if (ffields.length > 0) {
      this._facetMap.set(facet, ffields);
    } else {
      this._facetMap.delete(facet);
    }
    this._flattenMap();
  }

  removeAll() {
    this._facets = [];
    this._facetMap.clear();
    this._facetSource.next(this._facets);
    this.navigate();
  }


}
