import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/index';
import {PharosConfig} from "../../../../config/pharos-config";


const httpOptions = {
  // this is weird. https://github.com/angular/angular/issues/18586
  responseType: 'text' as 'text'
};

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


  private url: string;

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
