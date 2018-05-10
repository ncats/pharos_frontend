import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,  map } from 'rxjs/operators';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';

@Injectable()
export class SuggestApiService {
  url: string;

  constructor(private http: HttpClient,
              private environmentVariableService: EnvironmentVariablesService) {
    this.url = this.environmentVariableService.getSuggestPath();
  }

  // todo this should probably be piped through the pharos api service, or bundled as a self-contained module
  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(this.url +  query)
      .pipe(
        map(response => {
          const res = [];
            for (const [key, value] of Object.entries(response)) {
              res.push({name: key.replace(/_/g, ' '), options: value});
            }
          return res;
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
