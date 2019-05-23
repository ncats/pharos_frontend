import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  public responseCache = new Map();

  constructor(private http: HttpClient) {}

  public get<T>(url: string, options?: any): Observable<any> {
    const dataFromCache = this.responseCache.get(url);
    if (dataFromCache) {
      console.log("returning from cache")
      return of(dataFromCache);
    } else {
      console.log("calling" + url);
      const response = this.http.get<any>(url, options);
      response.subscribe(res => this.responseCache.set(url, res));
      return response;
    }
  }

  clearCache() {
    this.responseCache.clear();
  }
}
