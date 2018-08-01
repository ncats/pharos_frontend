import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';

/**
 * different config settings for radar types
 * todo: put in different config file
 * @type {Map<string, any>}
 */
const RADAR_SIZES: Map<string, any> = new Map<string, any>(
  [
    ['small', {
      maxValue: 1,
      margin: {top: 35, right: 20, bottom: 35, left: 20},
      levels: 1,
      dotRadius: 0, 			// The size of the colored circles of each blog
      format: '.1f',
      labels: false,
      axisLabels: false
    }
], ['medium', {
    maxValue: 1,
    levels: 5,
    format: '.2f',
    labels: false,
    axisLabels: true
  }
  ], ['medium-shape', {
    maxValue: 1,
    levels: 5,
    format: '.2f',
    labels: true,
    axisLabels: false
  }
] , ['large', {
      maxValue: 1,
    margin: {top: 50, right: 20, bottom: 50, left: 20},
    levels: 10,
      dotRadius: 5, 			// The size of the colored circles of each blog
      format: '.5f',
      labelFactor: 1.12,
      labels: true,
      axisLabels: true,
      legend: { title: 'Organization XYZ', translateX: 100, translateY: 40 },
    }
]
  ]
);

@Injectable({
  providedIn: 'root'
})

/**
 * retrieves radar chart data
 * returns radar chart config object
 */
export class RadarService {

  /**
   * map of different data retrieved, keyed by object id
   * @type {Map<string, any>}
   */
  private radarDataMap: Map<string, any> = new Map<string, any>();

  /**
   * url to call
   */
  private url: string;

  /**
   * create services and set url for data calls
   * @param {HttpClient} http
   * @param {EnvironmentVariablesService} environmentVariableService
   */
  constructor(private http: HttpClient,
              private environmentVariableService: EnvironmentVariablesService) {
    this.url = this.environmentVariableService.getRadarPath();
  }

  /**
   * check to see if data exists in map, if not retrieve it
   * @param {string} id
   * @return {any}
   */
  getData(id: string, origin: string): any {
    let temp: any = this.radarDataMap.get(id);
    if (!temp) {
      temp = this._fetchData(id);
      this.setData(id, temp, origin);
      return temp;
    } else {
      return of([temp[origin]]);
    }
  }

  /**
   * set api data in the api
   * @param {string} id
   * @param data
   */
  setData(id: string, data: any, origin: string): void {
    let temp: any = this.radarDataMap.get(id);
    if (temp) {
      temp[origin] = data;
    } else {
      temp = {[origin] : data};
    }
    this.radarDataMap.set(id, temp);
  }

  /**
   * return options for each size
   * @param {string} size
   * @return {any}
   */
  getOptions(size: string) {
    return RADAR_SIZES.get(size);
  }

  /**
   * call api to fetch data for the radar chart
   * @param {string} id
   * @return {any}
   * @private
   */
  _fetchData(id: string): any {
    return this.http.get<any[]>(this.url +  id)
      .pipe(
        catchError(this.handleError('getRadarData', []))
        );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): any {
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
