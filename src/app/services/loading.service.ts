import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoadingService {
  private _loadingSource = new Subject<boolean>();
  //  Observable navItem stream
  loading$ = this._loadingSource.asObservable();

  constructor() { }

  toggleVisible(force: boolean) {
    this._loadingSource.next(force);
  }
}


