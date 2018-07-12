import {Inject, Injectable, OnDestroy} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {PageData} from '../models/page-data';
import {PharosApiService} from './pharos-api.service';
import {Facet} from '../models/facet';
import {takeUntil} from 'rxjs/internal/operators';

/**
 * reads the api data stream and broadcasts the data to the required subscribers
 */
@Injectable()
export class ResponseParserService implements OnDestroy {
  /**
   * RxJs subject for facet data
   * @type {Subject<Facet[]>}
   * @private
   */
  private _facetsDataSource = new Subject<Facet[]>();

  /**
   * RxJs Behavior subject for main table data
   * starts empty
   * @type {BehaviorSubject<any>}
   * @private
   */
  private _tableDataSource = new Subject<any>();

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
   * dynamically inject pharos api to avoid circular dependency
   * initialize subscriptions on construction to keep from having to initialize them later
   * @param pharosApiService
   */
  constructor(@Inject(PharosApiService) private pharosApiService) {
    this.initializeSubscriptions();
  }

  /**
   * subscribe to 1 observable stream, and
   * broadcast to multiple different streams
   */
  initializeSubscriptions(): void {
    this.pharosApiService.data$
/*      .pipe(
        console.log("pipe"),
    //  takeUntil(this.ngUnsubscribe)
      )*/
      .subscribe(res => {
        console.log(res);
        if (res.object) {
          this._detailsDataSource.next(res);
        }
        if (res.content) {
          console.log("sdfsdfsd");
          this._tableDataSource.next(res);
        }
      this._paginationDataSource.next(new PageData(res));
      if (res.facets) {
        this._facetsDataSource.next(res.facets);
      }
      });
  }

  /**
   * unsubscribes from observables
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
