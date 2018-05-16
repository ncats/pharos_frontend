
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, of, combineLatest, BehaviorSubject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ParamMap} from '@angular/router';
import {EnvironmentVariablesService} from './environment-variables.service';
import {Topic} from '../models/topic';


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
    new Topic({
      id: 0,
      name: 'Bromodomain Inhibitors',
      description: 'Imagination is the key to painting. Just let your mind wander and enjoy. This should make you happy.' +
      ' Isn\'t it great to do something you can\'t fail at? Nature is so fantastic, enjoy it. Let it make you happy. ' +
      'You\'re the greatest thing that has ever been or ever will be. You\'re special. You\'re so very special. ' +
      'I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue In this world, everything can be happy. ' +
      'Trees get lonely too, so we\'ll give him a little friend. This is your world, whatever makes you happy you can put in it. ' +
      'Go crazy. Put your feelings into it, your heart, it\'s your world. Even the worst thing we can do here is good.' +
      ' Don\'t fiddle with it all day. The very fact that you\'re aware of suffering is enough reason to be overjoyed that ' +
      'you\'re alive and can experience it. You have freedom here. The only guide is your heart. ' +
      'We don\'t want to set these clouds on fire. Let your imagination be your guide.',
      class: 'target',
      diseaseCt: 45,
      ligandCt: 43,
      targetCt: 0,
      publicationCt: 25
    }),
    new Topic({
      id: 1,
      name: 'Lysomal Storage Disorders',
      description: 'Just relax and let it flow. That easy. This is your world. Everybody needs a friend. ' +
      'Don\'t be bashful drop me a line. We don\'t want to set these clouds on fire. Just use the old one inch brush.' +
      'Any little thing can be your friend if you let it be. Talent is a pursued interest. That is to say, anything you' +
      ' practice you can do. Now we\'ll take the almighty fan brush. If you\'ve been in Alaska less than a year you\'re a Cheechako.' +
      ' These trees are so much fun. I get started on them and I have a hard time stopping. We spend so much of our ' +
      'life looking - but never seeing. But we\'re not there yet, so we don\'t need to worry about it. ' +
      'It\'s so important to do something every day that will make you happy. You got your heavy coat out yet? ' +
      'It\'s getting colder. Do an almighty painting with us. We don\'t really know where this goes -' +
      'and I\'m not sure we really care.',
      class: 'disease',
      diseaseCt: 0,
      ligandCt: 45,
      targetCt: 45,
      publicationCt: 45
    }),
    new Topic({
      id: 2,
      name: 'Cystic Fibrosis',
      description: 'Maybe there\'s a happy little waterfall happening over here. In life you need colors. ' +
      'Decide where your cloud lives. Maybe he lives right in here. I can\'t think of anything more rewarding than being ' +
      'able to express yourself to others through painting. I\'m sort of a softy, I couldn\'t shoot Bambi except with a camera. ' +
      'All you need to paint is a few tools, a little instruction, and a vision in your mind. ' +
      'This is a happy place, little squirrels live here and play. Now then, let\'s play. Poor old tree. ' +
      'Let your imagination be your guide. Fluff it up a little and hypnotize it. Trees get lonely too, so we\'ll give ' +
      'him a little friend. ' +
      'Let\'s make a happy little mountain now. We\'ll play with clouds today.',
      class: 'disease',
      diseaseCt: 0,
      ligandCt: 4,
      targetCt: 5,
      publicationCt: 12
    })
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
    this._mergeSources();
  }

  /**
   * Api call to get main level paged data
   * @param {string} path The url sub path 'targets', diseases', 'ligands' etc.
   * @param {ParamMap} params The angular router parameters generated in subcomponents includes query, facet, sort and paging information.
   * @return void
   */
  getData(path: string, params: ParamMap): void {
    // todo: delete when api filled out
    if (path === 'topics') {
      this.getTopics();
    } else {
      const url = this._mapParams(path, params);
      this.http.get<any>(url)
        .pipe(
          catchError(this.handleError('getData', []))
        )
        .subscribe(response => {
          this._dataSource.next(response);
        });
    }
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
      this.getTopicsDetails(params.get('id'));
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
   * creates a query string to append to the url based on router paramaters
   * @param {string} path
   * @param {ParamMap} params
   * @returns {string}
   * @private
   */
  private _mapParams(path: string, params: ParamMap): string {
    let str = '';
    const strArr: string[] = [];
    if (params.keys.length === 0) {
      if(path === 'search'){
        str = this.environmentVariablesService.getDefaultUrl('targets');
      }else {
        str = this.environmentVariablesService.getDefaultUrl(path);
      }
    } else {
      str = this._URL + (path !== 'search' ? path + '?' : 'search?');//  + 'search?';
      params.keys.map(key => {
        params.getAll(key).map(val => {
            strArr.push(key + '=' + val);
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

  /**
   * garbage
   */
  getTopics() {
    this._dataSource.next({content: this.TOPICS});
  }

  /**
   * garbage
   * @param index
   */
  getTopicsDetails( index: any) {
    this._detailsSource.next(this.TOPICS[index]);
  }


}

