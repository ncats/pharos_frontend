import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { catchError, map, tap } from 'rxjs/operators';
import {of} from "rxjs/observable/of";
import {ParamMap} from "@angular/router";
import {environment} from "../../environments/environment.prod";

const URL =  environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataLoaderService {

    private _dataSource = new Subject<any>();
    //  Observable navItem stream
    data$ = this._dataSource.asObservable();
    data: any = [];


    constructor(private http: HttpClient) {}

    getData(path: string, params: ParamMap): Observable<any> {
      console.log(path);
      console.log(params);
      console.log(params.keys)
      const url = URL + path + '/';
        if (this.data.length > 0) {
            return of(this.data);
        } else {
            return this.http.get<any>(url)
                .pipe(
                    map(response =>  {
                      console.log(response);
                      this.data = response;
                      return response
                    }),
                    catchError(this.handleError('getData', []))
                );
        }
    }
    /*getByName(name: string): Observable<Tool> {
        if (this.data.length > 0) {
            return Observable.of(this.data.filter(tool => tool.toolName.toLowerCase() === name.toLowerCase())[0]);
        } else {
            return this.http.get(URL, {responseType: 'text'})
                .pipe(
                    map(response => {
                        this.data = [];
                        this.csvJSON(response.trim());
                        return this.data.filter(tool => tool.toolName.toLowerCase() === name.toLowerCase())[0];
                    }));
        }
    }
*/
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

