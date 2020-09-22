import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

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
   * list of fields to display from autocomplete
   */
  autocompleteFields: string[];

  /**
   * set up http graphQL suggestion service
   * @param {Apollo} apollo
   */
  constructor(private apollo: Apollo) {}

  /**
   * search function
   * this primarily happens on input change, but it could be anything
   * @param {string} query
   * @returns {Observable<any[]>}
   */
  search(query: string, listType: string): Observable<any[]> {
    const autocomplete = [];

    let SUGGESTQUERY;
    if (listType === "diseases") {
      SUGGESTQUERY = gql(`
      query {
        autocomplete(name:"${query}")
        {
          diseases{
            key
          }
        }
      }`);
    } else if (listType === "ligands"){
      SUGGESTQUERY = gql(`
      query {
        autocomplete(name:"${query}")
        {
          ligands{
            key
          }
        }
      }`);
    }
    else {
      SUGGESTQUERY = gql(`
      query {
        autocomplete(name:"${query}")
        {
          elapsedTime
          genes{
            key
          }
          targets{
            key
          }
          diseases{
            key
          }
          phenotypes{
            key
          }
          keywords{
            key
          }
        }
      }
    `);
    }

    let fetchQuery = this.apollo.query<any>({query: SUGGESTQUERY});

    return fetchQuery.pipe(
      map(response => {
        if (!response.data.autocomplete) {
          return autocomplete;
        }
        if (!!response.data.autocomplete.genes && response.data.autocomplete.genes.length > 0) {
          autocomplete.push({name: ["UniProt Gene"], options: response.data.autocomplete.genes});
        }
        if (!!response.data.autocomplete.targets && response.data.autocomplete.targets.length > 0) {
          autocomplete.push({name: ["Target"], options: response.data.autocomplete.targets});
        }
        if (!!response.data.autocomplete.diseases && response.data.autocomplete.diseases.length > 0) {
          autocomplete.push({name: ["Disease"], options: response.data.autocomplete.diseases});
        }
        if (!!response.data.autocomplete.phenotypes && response.data.autocomplete.phenotypes.length > 0) {
          autocomplete.push({name: ["Phenotype"], options: response.data.autocomplete.phenotypes});
        }
        if (!!response.data.autocomplete.keywords && response.data.autocomplete.keywords.length > 0) {
          autocomplete.push({name: ["UniProt Keyword"], options: response.data.autocomplete.keywords});
        }
        if (!!response.data.autocomplete.ligands && response.data.autocomplete.ligands.length > 0) {
          autocomplete.push({name: ["Ligands"], options: response.data.autocomplete.ligands});
        }
        return autocomplete;
      }),
      catchError(this.handleError('graphQL suggestion', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
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
