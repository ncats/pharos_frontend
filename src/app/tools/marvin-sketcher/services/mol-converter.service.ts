import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Subject} from "rxjs/index";
const _URL = 	environment.molConvertUrl;

@Injectable({
  providedIn: 'root'
})

export class MolConverterService {

  /**
   * RxJs subject to broadcast mol changes
   * @type {Subject<boolean>}
   * @private
   */
  private _molSource = new Subject<boolean>();

  /**
   * Observable stream of visibility changes
   * @type {Observable<boolean>}
   */
  smiles$ = this._molSource.asObservable();

  /**
   * add http client
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * posts to api to convert molfile to a stmiles string
   * @param {string} mol
   */
  convertMol(mol: string): void {
    this.http.post<any>(_URL, mol).subscribe(res => {
      console.log(res);
      this._molSource.next(res);
    })
  }
}
