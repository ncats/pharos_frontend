import {Injectable} from '@angular/core';
import {Facet, Field} from '../../../models/facet';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {PharosProfileService} from '../../../auth/pharos-profile.service';
import {ParamMap} from '@angular/router';

/**
 * Service to parse and filter facets from api responses
 */
@Injectable({
  providedIn: 'root'
})
export class SelectedFacetService {

  /**
   * map of facet names to facet
   * @type {Map<string, any>}
   */
  _facetMap: Map<string, Facet> = new Map<string, Facet>();


  /**
   * return the facets map as behavior subject
   * @type {Subject<any>}
   * @private
   */
  _facets = new BehaviorSubject<Map<string, Facet>>(null);

  /**
   * observable to return facets array
   * @type {Observable<Facet[]>}
   */
  facets$ = this._facets.asObservable();

  /**
   * set up subscription to parse the response object from the response service
   * @param profileService
   */
  constructor(
    private profileService: PharosProfileService
  ) {
    this.profileService.profile$.subscribe(user => {
      if (user && user.data().savedTargets) {
        this._facetMap.set(user.data().savedTargets.name, user.data().savedTargets);
        this._facets.next(this._facetMap);
      } else {
        this._facetMap.delete('etag');
        this._facets.next(this._facetMap);
      }
    });
  }

  // this handles graphql facet object, parses them to the url, and stores them as separate objects
  setFacets(facetObj: any) {
    const facet: Facet = this._facetMap.get(facetObj.name);
    if (facet) {
      if (facetObj.change.added) {
        if (facet.values.length > 0) {
          facet.values =
            [... new Set((facet.values.concat(facetObj.change.added.map(add => add = new Field({name: add})))).filter(name => name.name))];
        } else {
          facet.values = facetObj.change.added.map(add => add = new Field({name: add}));
        }
       // facet.values = [...new Set(facet.values.concat(facetObj.change.added.map(add => add = new Field({name: add}))))];
        this._facetMap.set(facetObj.name, facet);
      }
      if (facetObj.change.removed && facetObj.change.removed.length > 0) {
        facet.values = facet.values.map(value => value.name)
          .filter(val => ! facetObj.change.removed.includes(val))
          .map(newVal =>  new Field({name: newVal}));
        if (facet.values.length > 0) {
          this._facetMap.set(facetObj.name, facet);
        } else {
          this._facetMap.delete(facetObj.name);
        }
      }
    } else {
      const values = facetObj.change.added.map(field => field = {name: field});
      const newFacet: Facet = new Facet({facet: facetObj.name, values});

      this._facetMap.set(facetObj.name, newFacet);
    }
  }

  getFacetsAsUrlStrings(): string[] {
    const retArr: string[] = [];
   // this._facetMap.delete('query');
    const facets: Facet[] = Array.from(this._facetMap.values()).filter(
      fac => fac.facet !== 'query' && // TODO use pseudoFacet list instead
        fac.facet !== 'collection' &&
        fac.facet !== 'associatedTarget' &&
        fac.facet !== 'associatedDisease' &&
        fac.facet !== 'associatedStructure' &&
        fac.facet !== 'associatedLigand' &&
        fac.facet !== 'similarity');
    facets.forEach(facet => facet.values.forEach(value => retArr.push(this._makeFacetString(facet.facet, value.name))));
    return retArr;
  }

  getFacetFromUrlString(urlString: string) {

  }

/*  getFacetsFromParamMap(params: ParamMap) {
    console.log(params);
    console.log(this._facetMap);

  }*/

  getFacetsAsObjects(): Facet[] {
    return Array.from(this._facetMap.values());
  }

  getFacetByName(name: string): Facet {
    return this._facetMap.get(name);
  }

  getPseudoFacets(): Facet[]{
    return [
      this.getFacetByName('collection'),
      this.getFacetByName('query'),
      this.getFacetByName('associatedTarget'),
      this.getFacetByName('associatedDisease'),
      this.getFacetByName('associatedStructure'),
      this.getFacetByName('associatedLigand'),
      this.getFacetByName('similarity')
    ];
  }
  /**
   * remove entire group of facet values from query string
   * @param facet
   */
  removefacetFamily(facet: Facet): void {
    this._facetMap.delete(facet.facet);
  }

  /**
   * remove specific filter/query field from url
   * delete tracked facet
   * @param facetName
   * @param {string} field
   */
  removeField(facetName: string, field: string ): void {
    const facet = this._facetMap.get(facetName);
    if (facet) {
      facet.values = facet.values.filter(val => val.name !== field);
      if (facet.values.length > 0) {
        this._facetMap.set(facetName, facet);
      } else {
        this._facetMap.delete(facetName);
      }
    }
  }



  clearFacets() {
    this._facetMap.clear();
  }

  /**
   * converts a facet name and field into url readable string
   * @param {string} facet
   * @param {string} field
   * @returns {string}
   * @private
   */
  private _makeFacetString(facet: string, field: string): string {
    return facet.replace(/ /g, '+') + Facet.separator + encodeURIComponent(field.toString());
  }

  /**
   * this converts previous queries into an array of object that can be consumed by a component
   * gets {ParamMap} from {Route} snapshot and converts it to a map
   * @param {ParamMap} map
   */
  getFacetsFromParamMap(map: ParamMap): void {
    this.clearFacets();
    if (map.keys.length === 0) {
      return;
    } else {
      if (map.has('q') || map.has('query')) {
        this._facetMap.set('query', new Facet({facet: 'query', values: [{name: map.get('q') || map.get('query')}]}));
      }
      if (map.has('collection')) {
        this._facetMap.set('collection', new Facet({facet: 'collection', values: [{name: map.get('collection')}]}));
      }
      if (map.has('associatedTarget')){
        this._facetMap.set('associatedTarget', new Facet(
          {
            label: Facet.getReadableParameter('associatedTarget'),
            facet: 'associatedTarget', values: [{name: map.get('associatedTarget')}]
          }));
      }
      if (map.has('associatedDisease')){
        this._facetMap.set('associatedDisease', new Facet(
          {
            label: Facet.getReadableParameter('associatedDisease'),
            facet: 'associatedDisease', values: [{name: map.get('associatedDisease')}]
          }));
      }
      if (map.has('associatedStructure')){
        this._facetMap.set('associatedStructure', new Facet(
          {
            label: Facet.getReadableParameter('associatedStructure'),
            facet: 'associatedStructure', values: [{name: map.get('associatedStructure')}]
          }));
      }
      if (map.has('associatedLigand')){
        this._facetMap.set('associatedLigand', new Facet(
          {
            label: Facet.getReadableParameter('associatedLigand'),
            facet: 'associatedLigand', values: [{name: map.get('associatedLigand')}]
          }));
      }
      if (map.has('similarity')){
        this._facetMap.set('similarity', new Facet(
          {
            label: Facet.getReadableParameter('similarity'),
            facet: 'similarity', values: [{name: map.get('similarity')}]
          }));
      }
      const fList = map.getAll('facet');
      fList.forEach(facetString => {
        const fArr = facetString.split(Facet.separator);
        const facetName: string = fArr[0].replace(/\+/g, ' ');
        const fieldName: string = decodeURI(fArr[1])
          .replace('%2F', '/')
          .replace('%2C', ',')
          .replace('%3A', ':');
        const facet: Facet = this._facetMap.get(facetName);
        if (facet) {
          facet.values.push(new Field({name: fieldName}));
          const tempvalues: any[] = [... new Set(facet.values.map(val => val.name))];
          facet.values = tempvalues.map(newVal => newVal = new Field({name: newVal}));
          this._facetMap.set(facetName, facet);
        } else {
          const fct = new Facet({facet: facetName, values: [{name: fieldName}]});
          this._facetMap.set(facetName, fct);
        }
      });
    }
  }

  /**
   * return all facets
   * @return {Observable<any>}
   */
  getAllFacets(): Observable<Map<string, Facet>> {
    return this.facets$;
  }

  newDescription(route): string{
    const facets = this.getFacetsAsObjects();
    let str = `Found ${route.snapshot.data?.results?.count} ${route.snapshot.data?.path}. `;
    if (facets.length){
      str += 'The following filters were applied: ';
      str += facets.map(f => f.facet + ' = ' + f.values.map(v => v.name).join(' OR ')).join((' AND '));
    }
    return str;
  }


  /**
   * constructs the new title to show for the unfurled URL link
   */
  newTitle(route): string{
    const listType = route.snapshot.data.path;
    const listName = listType.replace('/', '').toLowerCase().slice(0, listType.length - 1);
    const listTitle = listName.charAt(0).toUpperCase() + listName.slice(1);
    return `Pharos: ${listTitle} List`;
  }
}
