import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class PathResolverService {
  private _pathSource = new BehaviorSubject<string>('targets');
  path$ = this._pathSource.asObservable();


  constructor() { }

  setPath(path: string): void {
    this._pathSource.next(path);
  }
}
