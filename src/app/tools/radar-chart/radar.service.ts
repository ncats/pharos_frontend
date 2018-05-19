import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {EnvironmentVariablesService} from "../../pharos-services/environment-variables.service";

const RADAR_SIZES: Map<string, any> = new Map<string, any>(
  [
    ['small', {
      w: 100,
      h: 100,
      maxValue: 1,
      levels: 1,
      dotRadius: 0, 			//The size of the colored circles of each blog
      roundStrokes: false,
      format: '.1f',
      labels: false,
      axisLabels: false
    }
],['medium',{
    w: 200,
    h: 200,
    maxValue: 1,
    levels: 5,
    roundStrokes: false,
    format: '.2f',
    labels: false
  }
] , ['large', {
      w: 800,
      h: 800,
      maxValue: 1,
      levels: 10,
      dotRadius: 5, 			//The size of the colored circles of each blog
      roundStrokes: false,
      format: '.5f',
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
export class RadarService {
radarDataMap: Map<string, any> = new Map<string, any>();
  url: string;

  constructor(private http: HttpClient,
              private environmentVariableService: EnvironmentVariablesService) {
    this.url = this.environmentVariableService.getRadarPath();
  }
  getData(id: string): any {
    let temp: any = this.radarDataMap.get(id);
    if(!temp){
    temp = this._fetchData(id);
    this.setData(id, temp);
    }
    return temp;
  }

  setData(id: string, data: any): void {
    this.radarDataMap.set(id, data);
  }

  getOptions(size: string){
    return RADAR_SIZES.get(size);
  }

  _fetchData(id: string): Observable<any> {
    return this.http.get<any[]>(this.url +  id)
      .pipe(
        catchError(this.handleError('getRadarData', []))
        )
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
