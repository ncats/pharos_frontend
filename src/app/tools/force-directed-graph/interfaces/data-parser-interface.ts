import {Observable} from 'rxjs/index';

export interface DataParserInterface {
  loadData(): Observable<any>;
  getData(): any;
  _parseData(data: any);
}
