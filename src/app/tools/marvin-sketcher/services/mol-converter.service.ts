import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Subject} from "rxjs/index";
const _URL = 	environment.molConvertUrl;

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
    this.http.post(_URL, mol, httpOptions).subscribe(res => {
      console.log(res);
      this._molSource.next(res);
    })
  }
}
