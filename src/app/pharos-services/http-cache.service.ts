import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

/**
 * todo: currently not used - kept making api calls twice, intead of caching them...
 * supposed to save api calls and their results in a map
 */
@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  /**
   * cache map
   */
  public responseCache = new Map();

  /**
   * import http client
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * http get method. checks map, returns response if exists, sets call and response if it doesn't
   * @param url
   * @param options
   */
  public get<T>(url: string, options?: any): Observable<any> {
    const dataFromCache = this.responseCache.get(url);
    if (dataFromCache) {
      return of(dataFromCache);
    } else {
      const response = this.http.get<any>(url, options);
      response.subscribe(res => this.responseCache.set(url, res));
      return response;
    }
  }

  /**
   * clear map
   */
  clearCache() {
    this.responseCache.clear();
  }
}
