
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {catchError, takeUntil} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {ParamMap} from '@angular/router';
import {EnvironmentVariablesService} from './environment-variables.service';
import {combineLatest} from "rxjs/observable/combineLatest";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable()
export class PharosApiService {

  private _dataSource = new Subject<any>();
  private _detailsSource = new BehaviorSubject<any>({});
  private _detailsUrlSource = new BehaviorSubject<any>({});
  private _URL: string;
  data$ = this._dataSource.asObservable();

  constructor(private http: HttpClient,
              private environmentVariablesService: EnvironmentVariablesService) {
    this._URL = this.environmentVariablesService.getApiPath();
    this._mergeSources();
  }

  getData(path: string, params: ParamMap): void {
    const url = this._mapParams(path, params);
    this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getData', []))
      ).subscribe(response => this._dataSource.next(response));
  }

  getDetails(path: string, params: ParamMap): void {
    const url = this._URL + path + '/' + params.get('id');
    this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getDetails', []))
      ).subscribe(response => {
      this._detailsSource.next(response)
    });
  }

  getDetailsByUrl(url: string, origin: string): void {
    this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getDetails', []))
      ).subscribe(response => {
      this._detailsUrlSource.next({origin: origin, data: response})
    });
  }

  private _mergeSources() {
    combineLatest(
      this._detailsSource,
      this._detailsUrlSource,
      (object, details) => {
        let returnedObject = {};
        if(details.origin) {
          returnedObject =  {object: object, [details.origin]: details.data};
        } else {
          returnedObject = {object: object};
        }
        return returnedObject;
      })
      .subscribe((res) => {
        console.log(res);
        this._dataSource.next(res)
      });
  }


  private _mapParams(path: string, params: ParamMap): string {
    let str = '';
    if (params.keys.length === 0) {
      str = this.environmentVariablesService.getDefaultUrl(path);
    } else {
      str = this._URL + path + '/search?';
      params.keys.map(key => {
        params.getAll(key).map(val => {
            str = str + key + '=' + val + '&';
          }
        );
      });
      // todo look into if this is the best way to make the url -- this is going to happen a lot
      str = str.slice(0, -1);
    }
    return str;
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

