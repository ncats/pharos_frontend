import { Injectable } from '@angular/core';
import {Subject} from "rxjs/index";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StructureSetterService {

  /**
   * RxJs subject to broadcast mol changes
   * @type {Subject<boolean>}
   * @private
   */
  private _structureSource = new Subject<string>();

  /**
   * Observable stream of visibility changes
   * @type {Observable<boolean>}
   */
  structure$ = this._structureSource.asObservable();

  /**
   * add http client
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {}

  /**
   * pass structure to subscription
   * @param {string} structure
   */
  setStructure(structure: string): void {
    console.log(structure);
    this.http.get<any>(structure).subscribe(res => {
      console.log(res);
      this._structureSource.next(res.molfile)
    });
  }
}
