import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/index';
import {PharosConfig} from '../../../../config/pharos-config';

/**
 * http options object, used since the returned info isn't really json
 * @type {{responseType: "text"}}
 */
const httpOptions = {
  // this is weird. https://github.com/angular/angular/issues/18586
  responseType: 'text' as 'text'
};

/**
 * service to convert marvinjs mol file to a smiles string
 */
@Injectable({
  providedIn: 'root'
})
export class MolConverterService {

  /**
   * RxJs subject to broadcast mol changes
   * @type {Subject<boolean>}
   * @private
   */
  private _molSource = new Subject<string>();

  /**
   * Observable stream of visibility changes
   * @type {Observable<boolean>}
   */
  smiles$ = this._molSource.asObservable();

  /**
   * url set by config parameters
   */
  private url: string;

  /**
   * get config and set up http calls to convert molfile
   * @param {PharosConfig} pharosConfig
   * @param {HttpClient} http
   */
  constructor(
    private pharosConfig: PharosConfig,
    private http: HttpClient) {
    this.url = this.pharosConfig.getMolConvertUrl();
  }

  /**
   * posts to api to convert molfile to a stmiles string
   * @param {string} mol
   */
  convertMol(mol: string): void {
    this.http.post(this.url, mol, httpOptions).subscribe(res => {
      this._molSource.next(res);
    });
  }
}
