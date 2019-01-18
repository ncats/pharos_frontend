import {Observable} from "rxjs/index";

export interface DataParserInterface {
  LoadData(): Observable<any>;
  getData(): any;
  _parseData(data: any);
}
