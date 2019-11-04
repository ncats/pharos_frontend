import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable, of, Subject} from 'rxjs';
import {catchError, take} from 'rxjs/operators';
import {ParamMap} from '@angular/router';
import {Topic} from '../models/topic';
import {map, tap} from 'rxjs/internal/operators';
import {PharosConfig} from '../../config/pharos-config';
import {PharosBase} from '../models/pharos-base';
import {Target} from '../models/target';
import {PageData} from '../models/page-data';
import {Facet} from '../models/facet';
import {Apollo, Query, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import {PathResolverService} from './path-resolver.service';

const PAGINATESUBTYPESSTUB = `
query fetchPublications ($skip: Int, $top: Int, $term: String) {
  targets: target(
    q: {
    sym: "HTT"
    #tcrdid: $term
  }
) {
    _tcrdid: tcrdid
    uniprot
    
  }
}
`;


/**
 * main service to fetch and parse data from the pharos api
 */
@Injectable({
  providedIn: 'root'
})
export class PharosApiService {
  /**
   * RxJs subject for facet data
   * @type {Subject<Facet[]>}
   * @private
   */
  private _facetsDataSource = new BehaviorSubject<Facet[]>(null);

  /**
   * RxJs Behavior subject for main table data
   * starts empty
   * @type {BehaviorSubject<any>}
   * @private
   */
  private _tableDataSource = new BehaviorSubject<any>({});

  /**
   * RxJs subject to return pagination data
   * @type {Subject<PageData>}
   * @private
   */
  private _paginationDataSource = new Subject<PageData>();

  /**
   * RxJs subject to return details for a given object
   * @type {Subject<any>}
   * @private
   */
  private _detailsDataSource = new Subject<any>();
  /**
   * RxJs subject to unsubscribe from all subscriptions
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  /**
   * Observable stream of facet changes
   * @type {Observable<Facet[]>}
   */
  facetsData$ = this._facetsDataSource.asObservable();

  /**
   * Observable stream of table data changes
   * @type {Observable<any>}
   */
  tableData$ = this._tableDataSource.asObservable();

  /**
   * observable stream of pagination changes
   * @type {Observable<PageData>}
   */
  paginationData$ = this._paginationDataSource.asObservable();

  /**
   * Obsetvable stream of data details
   * @type {Observable<any>}
   */
  detailsData$ = this._detailsDataSource.asObservable();

  /**
   * base API url - set in environment.prod.ts
   */
  private _URL: string;

  /**
   * search field objects. currently the url string is not used, so this could be reduced down to a list of fields
   * // todo reduce to fields strings
   */
  private _SEARCHURLS: any[];

  // todo: delete when api exists
  /**
   * garbage
   * @type {Topic[]}
   */
  TOPICS = [
    {
      id: 0,
      name: 'Bromodomain Inhibitors',
      description: 'BET inhibitors are a class of drugs with anti-cancer, immunosuppressive, and other effects in ' +
        'clinical trials in the United States and Europe and widely used in research. These molecules reversibly bind ' +
        'the bromodomains of Bromodomain and Extra-Terminal motif (BET) proteins BRD2, BRD3, BRD4, and BRDT, and prevent ' +
        'protein-protein interaction between BET proteins and acetylated histones and transcription factors.',
      class: 'target',
      targetList: ['BRD2', 'BRD3', 'BRD4', 'BRDT'],
      diseaseCt: 0,
      ligandCt: 818,
      targetCt: 4,
      publicationCt: 0
    },
    {
      id: 1,
      name: 'Kinase: IDG Consortium (Targets)',
      description: 'A series of interesting kinase targets manually selected by the IDG consortium',
      class: 'target',
      url: 'targets/search?facet=Collection+Kinase:IDG+Consortium+(Targets)&top=150',
      diseaseCt: 118,
      ligandCt: 1317,
      targetCt: 125,
      publicationCt: 0
    }, {
      id: 2,
      name: 'Regulation of Autophagy',
      description: 'Any process that modulates the frequency, rate or extent of autophagy. ' +
        'Autophagy is the process in which cells digest parts of their own cytoplasm. [GOC:dph, GOC:tb] [GO]',
      url: 'targets/search?facet=GO+Process/regulation%20of%20autophagy&top=100',
      class: 'target',
      diseaseCt: 53,
      ligandCt: 5161,
      targetCt: 50,
      publicationCt: 0
    }, {
      id: 3,
      name: 'GPCR: Class F frizzled-type',
      description: 'A family of seven-pass transmembrane cell-surface proteins that combines with LOW DENSITY ' +
        'LIPROTEIN RECEPTOR-RELATED PROTEIN-5 or LOW DENSITY LIPROTEIN RECEPTOR-RELATED PROTEIN-5 to form receptors ' +
        'for WNT PROTEINS. Frizzled receptors often couple with HETEROTRIMERIC G PROTEINS and regulate the WNT ' +
        'SIGNALING PATHWAY.',
      class: 'targets',
      url: 'targets/search?facet=IDG+Target+Family/GPCR&facet=DTO+Protein+Class+%281%29/Class+F+frizzled-type&top=20',
      diseaseCt: 10,
      ligandCt: 234,
      targetCt: 11,
      publicationCt: 0
    }, {
      id: 4,
      name: 'WD40 repeat domain proteins',
      description: 'The WD40 repeat (also known as the WD or beta-transducin repeat) is a short structural motif of ' +
        'approximately 40 amino acids, often terminating in a tryptophan-aspartic acid (W-D) dipeptide.[2] Tandem copies' +
        ' of these repeats typically fold together to form a type of circular solenoid protein domain called the WD40 ' +
        'domain.',
      class: 'targets',
      url: 'targets/search?facet=UniProt+Keyword/WD+repeat&top=300',
      displayTargets: {
        mostKnowledge: 'LRRK2',
        mostPotential: 'GNB3',
        leastKnowledge: 'CDC20B'
      },
      diseaseCt: 108,
      ligandCt: 497,
      targetCt: 277,
      publicationCt: 0
    }, {
      id: 5,
      name: 'DNA damage response',
      description: '',
      class: 'targets',
      url: 'targets/search?facet=GO+Process/cellular+response+to+DNA+damage+stimulus&facet=WikiPathways+Pathway/DNA+Damage+Response+%28only+ATM+dependent%29&facet=WikiPathways+Pathway/DNA+IR-damage+and+cellular+response+via+ATR&facet=WikiPathways+Pathway/miRNA+Regulation+of+DNA+Damage+Response&facet=WikiPathways+Pathway/DNA+Damage+Response&top=100',
      diseaseCt: 100,
      ligandCt: 6359,
      targetCt: 43,
      publicationCt: 0
    }
  ];

  /**
   * main object tracker to help with caching
   */
  returnedObject: any = {};

  openQueries: Map<string, QueryRef<any>> = new Map<string, QueryRef<any>>();

  /**
   * get config info and set up http service
   * @param {HttpClient} http
   * @param apollo
   * @param {PharosConfig} pharosConfig
   */
  constructor(private http: HttpClient,
              private apollo: Apollo,
              @Inject(PathResolverService) private pathResolverService,
              private pharosConfig: PharosConfig) {
    this._URL = this.pharosConfig.getApiPath();
    this._SEARCHURLS = this.pharosConfig.getSearchPaths();
  }

  /**
   * Api call to get main level paged data
   * @param {string} path The url sub path 'targets', diseases', 'ligands' etc.
   * @param {ParamMap} params The angular router parameters generated in subcomponents includes query, facet, sort and paging information.
   * @return void
   */
  getData(path: string, params: ParamMap): Observable<any> {

    // todo: delete when api filled out
    /* if (path === 'topics') {
       of(this.TOPICS).subscribe(topics => {
         this._dataSource.next(
           {
             content: [{kind: path, data: {content: topics}}],
             facets: []
           });
       });
     } else {*/
    const url = this._mapParams(path, params);
    return this.http.get<any>(url)
      .pipe(
        tap(res => {
          if (path !== 'topics') {
            this._facetsDataSource.next(res.facets);
          }
        }),
        catchError(this.handleError('getData', []))
      );
  }


  /**
   * call graphql pagination
   * skip
   * top
   * filter
   * term
   * @param {string} path
   * @param {ParamMap} params
   * @param fragments
   * @return {Observable<any>}
   */
  getGraphQlData(path: string, params: ParamMap, fragments?: any): Observable<any> {
    console.log(this);
    const variables = this._mapVariables(path, params);
    /**
     * With query() you fetch data, receive the result, then an Observable completes.
     * With watchQuery() you fetch data, receive the result and an Observable is keep opened for new
     * emissions so it never completes.
     * @type {Observable<ApolloQueryResult<any>>}
     */

    const fetchQuery = this.apollo.query<any>({
      query: gql`
        query PaginateData($skip: Int, $top: Int, $filter: IFilter){
          results:${path} (filter: $filter) {
            count
              facets {
                facet
                count
                  values {
                   name
                   value
                }
              }
            ${path}(skip: $skip, top: $top) {
            ...${path}ListFields
            }
          }
        }
        ${fragments}
      `,
      variables: variables
    });
    return fetchQuery;
  }


  getDetailsData(path: string, params: ParamMap, fragments?: any): Observable<any> {
    const variables: any = {term: params.get('id')};
    const fetchQuery = this.apollo.query({
      query: gql`
        query fetchTarget($term: String) {
          targets: target(q: {
            sym: $term,
            #tcrdid: $term,
            uniprot: $term,
            stringid:$term
          }) {
        ...targetsDetailsFields
        }
        }
        ${fragments}
      `,
      variables: variables
    });


    // fetchQuery.fetchMore()
    return fetchQuery;

  }

  /**
   * creates a fork join to return the results of api search calls to targeted object kinds
   * this reduces the number of irrelevant results return that need to be parsed,
   * and also allows for paging and faceting independently of the data type
   * @param {ParamMap} params
   */
  search(params: ParamMap): Observable<any> {
    const apis = this._SEARCHURLS.map(api => {
      return this.http.get<any>(this._mapParams(api.field, params))
        .pipe(
          map(res => {
            if (api.field !== 'search') {
              return res = {kind: api.field, data: res};
            } else {
              this._facetsDataSource.next(res.facets);
              return {};
            }
          })
        );
    });

    return forkJoin([...apis]);
  }

  /**
   * returns data as an observable helps the router to return the main data object
   * @param {string} path
   * @param {ParamMap} params
   * @return {Observable<any>}
   */
  getDataObject(path: string, params: ParamMap): Observable<any> {
    if (path === 'topics') {
      return of(this.TOPICS[params.get('id')]);
    } else {
      const url = `${this._URL}${path}/${params.get('id')}`;

      return this.http.get<PharosBase>(url)
        .pipe(
          catchError(this.handleError('getDataObject', []))
        );
    }
  }

  callApolloQuery(id: string | number, fields: string) {
    this.apollo.watchQuery({
      query: gql`
        {
          target(
            q: {
              #geneid:116328
              #tcrdid:15380
              uniprot: "${id}"
            }
          ){
            ${fields}
            }
        }
      `,
    }).valueChanges.subscribe(res => {
      console.log(res);
    });

  }

  /**
   * Api call to get specific data detail information
   * always return a response. the ingesting methods filter out empty responses
   * @param {string} url
   * @param {string} origin
   */
  getDetailsByUrl(url: string, origin: string): void {
    this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getDetailsByUrl', []))
      ).subscribe(response => {
      this.returnedObject[origin] = response;
      //   this._dataSource.next({details: this.returnedObject});
      this._detailsDataSource.next(this.returnedObject);
      //  this._detailsUrlSource.next({origin: origin, data: response});
    });
  }

  /**
   * clear all data called
   */
  flushData() {
    this.returnedObject = {};
    this._detailsDataSource.next(null);
  }


  private _mapVariables(path: string, params: ParamMap): any {
    console.log(params);
    const ret: {top?: number, skip?: number, filter?: {term, facets}} = {};
    params.keys.map(key => {
      params.getAll(key).map(val => {
          switch (key) {
            case 'page': {
              const rows = params.get('rows');
              if (rows) {
                ret.top = +rows;
              } else {
                ret.top = 10;
                ret.skip = 10 * (+val - 1);
              }
              break;
            }
            case 'rows': {
              const page = params.get('page');
              if (page) {
                ret.skip = +val * (+page - 1);
              }
              break;
            }
            case 'facet': {
              const filter: any = ret.filter ? ret.filter : {};
              const currentFacets = this.pathResolverService.getFacetsAsObjects();
              console.log(this.pathResolverService.getFacetsAsObjects());
              console.log(val);
              // map facet string to object for API
              if (!currentFacets.length) {
                const fArr = val.split('/');
                const facetName: string = fArr[0].replace(/\+/g, ' ');
                const fieldName: string = decodeURI(fArr[1])
                  .replace('%2F', '/')
                  .replace('%2C', ',')
                  .replace('%3A', ':');
                filter.facets = [{facet: facetName, values: [fieldName]}];
              } else {
                // map facet object to be mapped
                filter.facets = currentFacets
                  .map(facet => facet = {facet: facet.facet, values: facet.values.map(value => value.name)});
                console.log(filter);
              }
              ret.filter = filter;
             break;
            }
            default: {
              console.log(val);
              ret[key] = val;
              break;
            }
          }
        }
      );
    });
  console.log(ret);
    return ret;
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
        str = this.pharosConfig.getDefaultUrl('targets');
      } else {
        str = this.pharosConfig.getDefaultUrl(path);
      }
    } else {
      str = this._URL + (path !== 'search' ? path + '/' : '') + 'search?';
      params.keys.map(key => {
        params.getAll(key).map(val => {
            switch (key) {
              case 'page': {
                const rows = params.get('rows');
                if (rows) {
                  strArr.push('top=' + rows);
                } else {
                  strArr.push('top=' + 10);
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
      if (path === 'ligands') {
        strArr.push(`view=full`);
      }
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

