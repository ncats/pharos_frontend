import {Inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PageData} from '../models/page-data';
import {PharosApiService} from './pharos-api.service';
import {Facet} from '../models/facet';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ResponseParserService {
  private _facetsDataSource = new Subject<Facet[]>();
  private _tableDataSource = new BehaviorSubject<any>(null);
  private _paginationDataSource = new Subject<PageData>();
  private _detailsDataSource = new Subject<any>();

  //  Observable navItem stream
  facetsData$ = this._facetsDataSource.asObservable();
  tableData$ = this._tableDataSource.asObservable();
  paginationData$ = this._paginationDataSource.asObservable();
  detailsData$ = this._detailsDataSource.asObservable();

  constructor(@Inject(PharosApiService) private pharosApiService) {
    this.initializeSubscriptions();
  }

  initializeSubscriptions(): void {
    this.pharosApiService.data$
      .subscribe(res => {
        if (res.object) {
          this._detailsDataSource.next(res);
        }
      this._tableDataSource.next(res.content);
      this._paginationDataSource.next(new PageData(res));
      if (res.facets) {
        this._facetsDataSource.next(res.facets);
      }
      });
  }
}
