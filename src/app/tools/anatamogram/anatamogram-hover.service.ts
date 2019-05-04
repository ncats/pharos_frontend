import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {DataProperty} from '../generic-table/components/property-display/data-property';
import {BehaviorSubject} from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class AnatamogramHoverService {

  private _tissueSource = new Subject<string>();


  tissues$ = this._tissueSource.asObservable();

  setTissue(tissue?: string) {
    this._tissueSource.next(tissue);
  }
}


