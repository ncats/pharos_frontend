import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Facet} from "../../models/facet";

/**
 * api helper service to connect to search suggest fields
 */
@Injectable()
export class SuggestApiService {

  /**
   * autocomplete search url
   */
  url: string;

  /**
   * set up http graphQL suggestion service
   * @param {Apollo} apollo
   */
  constructor(private apollo: Apollo) {
  }

  /**
   * search function
   * this primarily happens on input change, but it could be anything
   * @param {string} query
   * @returns {Observable<any[]>}
   */
  search(query: string): Observable<any[]> | []{
    if(!query) {
      return [];
    }
    let SUGGESTQUERY = gql(`
      query {
        autocomplete(name:"${query}")
        {
          value
          categories {
            category
            reference_id
          }
        }
      }`);

    let fetchQuery = this.apollo.query<any>({query: SUGGESTQUERY});

    return fetchQuery.pipe(map(
          response => {
            const results = [];
            for(let row of response.data.autocomplete){
              results.push(...autocompleteOption.parse(row));
            }
            return results;
          }),
        catchError(this.handleError('graphQL suggestion', []))
      )
    ;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export class autocompleteOption{
  value: string;
  category: string;
  reference_id?: string;
  path: string;
  facet?: string;
  parameter?: string;

  static getPath(obj: autocompleteOption){
    if(autocompleteOption.hasQueryParam(obj)){
      return obj.path;
    }
    if(obj.reference_id){
      return obj.path + "/" + obj.reference_id;
    }
    return obj.path;
  }

  static getQueryParam(obj: autocompleteOption){
    let qParam = {facet: null, associatedDisease: null, associatedTarget: null, associatedLigand: null, q: null};
    if(autocompleteOption.isDetailsPage(obj)){
      return qParam;
    }
    if(obj.facet){
      qParam.facet = obj.facet + Facet.separator + obj.value;
      return qParam;
    }
    if(obj.parameter){
      qParam[obj.parameter] = obj.reference_id || obj.value;
      return qParam;
    }
    qParam.q = obj.value;
    return qParam;
  }

  static hasQueryParam(obj: autocompleteOption){
    return !!obj.facet || !!obj.parameter;
  }

  static isDetailsPage(obj: autocompleteOption){
    return !autocompleteOption.hasQueryParam(obj) && !!obj.reference_id;
  }

  static parse(queryRow: any): autocompleteOption[]{
    const retArray = [];
    for(let cat of queryRow.categories) {
      if(cat.category === "Drugs"){
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "ligands"
        } as autocompleteOption);
      }
      else if(cat.category === "Genes"){
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "targets"
        } as autocompleteOption);
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "diseases",
          parameter: "associatedTarget"
        } as autocompleteOption);
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "ligands",
          parameter: "associatedTarget"
        } as autocompleteOption);
      }
      else if(cat.category === "Targets"){
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "targets"
        } as autocompleteOption);
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "diseases",
          parameter: "associatedTarget"
        } as autocompleteOption);
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "ligands",
          parameter: "associatedTarget"
        } as autocompleteOption);
      }
      else if(cat.category === "Diseases"){
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "diseases"
        } as autocompleteOption);
        retArray.push({
          value: queryRow.value,
          reference_id: cat.reference_id,
          path: "targets",
          parameter: "associatedDisease"
        } as autocompleteOption);
      }
      else{
        retArray.push({
          value: queryRow.value,
          path: "targets",
          facet: cat.category
        })
      }
    }
    return retArray;
  }
}
