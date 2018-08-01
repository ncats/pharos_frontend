import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,  map } from 'rxjs/operators';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';

@Injectable()
export class SuggestApiService {
  url: string;
  autocompleteFields: string[];

  constructor(private http: HttpClient,
              private environmentVariableService: EnvironmentVariablesService) {
    this.url = this.environmentVariableService.getSuggestPath();
    this.autocompleteFields = this.environmentVariableService.getAutocompleteFields();
  }

  // todo this should probably be piped through the pharos api service, or bundled as a self-contained module
  search(query: string): Observable<any[]> {
    const autocomplete = [];
    return this.http.get<any[]>(this.url +  query)
      .pipe(
        map(response => {
          this.autocompleteFields.forEach(field => {
            if (response[field] && response[field].length > 0) {
              autocomplete.push({name: [field.replace(/_/g, ' ')], options: response[field]});
            }
          });
          return autocomplete;
        }),
        catchError(this.handleError('getProtocols', []))
      );
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
