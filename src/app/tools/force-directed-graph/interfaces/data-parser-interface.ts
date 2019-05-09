import {Observable} from 'rxjs/index';

/**
 * interface for custom data parsers
 */
export interface DataParserInterface {

  /**
   * load data from any source
   * @return {Observable<any>}
   */
  loadData(): Observable<any>;

  /**
   * get data
   * @return {any}
   */
  getData(): any;

  /**
   * parse data from loaded source
   * @param data
   * @private
   */
  _parseData(data: any);
}
