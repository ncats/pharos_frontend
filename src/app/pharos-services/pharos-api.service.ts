
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, of, combineLatest, BehaviorSubject, forkJoin, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ParamMap} from '@angular/router';
import {EnvironmentVariablesService} from './environment-variables.service';
import {Topic} from '../models/topic';
import {delay, map} from 'rxjs/internal/operators';


@Injectable()
export class PharosApiService {
  /**
   * RxJs subject to broadcast data
   * @type {Subject<any>}
   * @private
   */
  private _dataSource = new Subject<any>();

  /**
   * RxJs behavior subject to broadcast data details
   * initialized as empty because the data is updated by the component getter and setter, rather than a subscription
   * @type {BehaviorSubject<any>}
   * @private
   */
  private _detailsSource = new BehaviorSubject<any>({});

  /**
   * RxJs Behavior subject to broadcast specific details api calls
   * initialized as empty because the data is updated by the component getter and setter, rather than a subscription
   * @type {BehaviorSubject<any>}
   * @private
   */
  private _detailsUrlSource = new BehaviorSubject<any>({});

  /**
   * base API url - set in environment.prod.ts
   */
  private _URL: string;

  /**
   * search field objects. currently the url string is not used, so this could be reduced down to a list of fields
   * // todo reduce to fields strings
   */
  private _SEARCHURLS: any[];

  /**
   * single source to reuturn data
   * @type {Observable<any>}
   */
  data$ = this._dataSource.asObservable();

  // todo: delete when api exists
  /**
   * garbage
   * @type {Topic[]}
   */
  private TOPICS = [
      {
        id: 0,
        name: 'Bromodomain Inhibitors',
        description: 'BET inhibitors are a class of drugs with anti-cancer, immunosuppressive, and other effects in ' +
        'clinical trials in the United States and Europe and widely used in research. These molecules reversibly bind ' +
        'the bromodomains of Bromodomain and Extra-Terminal motif (BET) proteins BRD2, BRD3, BRD4, and BRDT, and prevent ' +
        'protein-protein interaction between BET proteins and acetylated histones and transcription factors.',
        class: 'target',
        diseaseCt: 59,
        ligandCt: 818,
        targetCt: 4,
        publicationCt: 0
      },
      {
        id: 1,
        name: 'Lysomal Storage Disorders',
        description: 'A group of autosomal recessive or X-linked inherited metabolic disorders caused by defects in ' +
        'the function of the lysosomes. Signs and symptoms include hepatomegaly, splenomegaly, nervous system ' +
        'manifestations, skeletal abnormalities, and mental deterioration. Representative examples include Gaucher ' +
        'disease, Niemann-Pick disease, Wolman disease, and Fabry disease.',
        class: 'disease',
        diseaseCt: 104,
        ligandCt: 45,
        targetCt: 45,
        publicationCt: 0
      },
      {
        id: 2,
        name: 'Kinase: IDG Consortium (Targets)',
        description: '',
        class: 'disease',
        diseaseCt: 1,
        ligandCt: 4,
        targetCt: 5,
        publicationCt: 0
      },{
      id: 3,
      name: 'Regulation of Autophagy',
      description: 'Any process that modulates the frequency, rate or extent of autophagy. ' +
    'Autophagy is the process in which cells digest parts of their own cytoplasm. [GOC:dph, GOC:tb] [GO]',
      url: 'targets/search?facet=GO+Process/regulation%20of%20autophagy&top=100',
  class: 'target',
      diseaseCt: 1,
      ligandCt: 4,
      targetCt: 50,
      publicationCt: 0
    },{
        id: 4,
        name: 'GPCR: Class F frizzled-type',
        description: 'A family of seven-pass transmembrane cell-surface proteins that combines with LOW DENSITY ' +
        'LIPROTEIN RECEPTOR-RELATED PROTEIN-5 or LOW DENSITY LIPROTEIN RECEPTOR-RELATED PROTEIN-5 to form receptors ' +
        'for WNT PROTEINS. Frizzled receptors often couple with HETEROTRIMERIC G PROTEINS and regulate the WNT ' +
        'SIGNALING PATHWAY.',
        class: 'targets',
        url:'targets/search?facet=IDG+Target+Family/GPCR&facet=DTO+Protein+Class+%281%29/Class+F+frizzled-type',
        diseaseCt: 1,
        ligandCt: 4,
        targetCt: 5,
        publicationCt: 0
      }
  ];

  /**
   * create services
   * set url
   * merge subscriptions
   * @param {HttpClient} http
   * @param {EnvironmentVariablesService} environmentVariablesService
   */
  constructor(private http: HttpClient,
              private environmentVariablesService: EnvironmentVariablesService) {
    this._URL = this.environmentVariablesService.getApiPath();
    this._SEARCHURLS = this.environmentVariablesService.getSearchPaths();
    this._mergeSources();
  }

  /**
   * Api call to get main level paged data
   * if the call is a search, redirects to a different series of calls
   * @param {string} path The url sub path 'targets', diseases', 'ligands' etc.
   * @param {ParamMap} params The angular router parameters generated in subcomponents includes query, facet, sort and paging information.
   * @return void
   */
  getData(path: string, params: ParamMap): void {
    if (path === 'search') {
      this.search(params);
    } else {
      // todo: delete when api filled out
      if (path === 'topics') {
        of(this.TOPICS).pipe(delay(500)).subscribe(topics => {
          this._dataSource.next({
            content: [{kind: path, data: {content:topics}}],
            facets: []
          });
        })
      } else {
        const url = this._mapParams(path, params);
        this.http.get<any>(url)
          .pipe(
            catchError(this.handleError('getData', []))
          )
          .subscribe(response => {
            this._dataSource.next(
              {
              content: [{kind: path, data: response}],
              facets: response.facets
              }
              );
          });
      }
    }
  }

  /**
   * creates a fork join to return the results of api search calls to targeted object kinds
   * this reduces the number of irrelevant results return that need to be parsed,
   * and also allows for paging and faceting independently of the data type
   * @param {ParamMap} params
   */
  search(params: ParamMap): void {
    const apis = this._SEARCHURLS.map(api => {
      return this.http.get<any>(this._mapParams(api.field, params))
        .pipe(
          map(res => res = {kind: api.field, data: res})
        );
    });

    forkJoin(...apis).subscribe(res => {
      this._dataSource.next({content: res});
    });
  }

  /**
   * api call to get main level data list, based on a full url from environment.prod
   * todo this might not get used
   * @param {string} url
   */
  getDataByUrl(url: string): void {
    this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getDataUrl', []))
      ).subscribe(response => {
      this._dataSource.next( response);
    });
  }

  /**
   * Api call to get data details
   * @param {string} path The url sub path 'targets', diseases', 'ligands' etc.
   * @param {ParamMap} params The angular router parameters generated in subcomponents includes query, facet, sort and paging information.
   * @return void
   */
  getDetails(path: string, params: ParamMap): void {
    // todo: delete when api filled out
    if (path === 'topics') {
      of(this.TOPICS[params.get('id')]).pipe(delay(500)).subscribe(response => {
        this._detailsSource.next(response);
      });
    } else {
      const url = this._URL + path + '/' + params.get('id');
      this.http.get<any>(url)
        .pipe(
          catchError(this.handleError('getDetails', []))
        ).subscribe(response => {
        this._detailsSource.next(response);
      });
    }
  }

  /**
   * Api call to get specific data detail information
   * @param {string} url
   * @param {string} origin
   */
  getDetailsByUrl(url: string, origin: string): void {
    this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getDetails', []))
      ).subscribe(response => {
      this._detailsUrlSource.next({origin: origin, data: response});
    });
  }

  flushData(){
    this._dataSource.next({});
    this._detailsSource.next({});
    this._detailsUrlSource.next({});
  }

  /**
   * merges several api details calls to 1 details object
   * @private
   */
  private _mergeSources(): void {
    let returnedObject = {};
    const cl: Observable<any> = combineLatest(
      this._detailsSource,
      this._detailsUrlSource);
    cl.subscribe(([object, details]) => {
      if (details.origin) {
        returnedObject[details.origin] = details.data;
        // this is needed to change details object
        // todo: is this the ideal way to do it? seems brittle
        if (object) {
          returnedObject['object'] = object;
        }
      } else {
        returnedObject = {object: object};
      }
      this._dataSource.next(returnedObject);
    });

  }

  /**
   * creates a query string to append to the url based on router parameters
   * @param {string} path
   * @param {ParamMap} params
   * @returns {string}
   * @private
   */
  private _mapParams(path: string, params: ParamMap): string {
    let str = '';
    const strArr: string[] = [];
    if (params.keys.length === 0) {
      // todo in api, this fixes the url, but not in the ui
      if (path === 'search') {
        str = this.environmentVariablesService.getDefaultUrl('targets');
      } else {
        str = this.environmentVariablesService.getDefaultUrl(path);
      }
    } else {
      str = this._URL + (path !== 'search' ? path + '/' : '')  + 'search?';
      // str = this._URL + (path !== 'search' ? path + '?' : 'search?');
      params.keys.map(key => {
        params.getAll(key).map(val => {
          switch (key) {
            case 'page': {
              const rows = params.get('rows');
              if (rows) {
                strArr.push('top=' + rows);
              } else {
                strArr.push('skip=' + 10 * (+val - 1));
              }
              break;
            }
            case 'rows': {
              const page = params.get('page');
              if (page) {
                strArr.push('skip=' + +val * (+page - 1));
              }
              break;
            }
            default: {
              strArr.push(key + '=' + val);
              break;
            }
          }
          }
        );
      });
      str = str + strArr.join('&');
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

