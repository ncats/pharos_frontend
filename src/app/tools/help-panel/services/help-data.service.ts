import {Injectable, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {ResponseParserService} from '../../../pharos-services/response-parser.service';

@Injectable({
  providedIn: 'root'
})
export class HelpDataService {
  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<any>(null);

  // change data to use getter and setter
  @Input()
  set data(value: any) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _helpDataSource = new BehaviorSubject<any>({});

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  data$ = this._helpDataSource.asObservable();

  constructor(
    private responseParserService: ResponseParserService,
  ) {
    this.responseParserService.detailsData$
      .subscribe(res => this.data = res);
  }

  fetchData(field: string) {
    this._helpDataSource.next(this.data[field]);
  }
}
