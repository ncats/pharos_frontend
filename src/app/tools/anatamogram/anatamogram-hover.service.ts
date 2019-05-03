import {Injectable, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {DataProperty} from '../generic-table/components/property-display/data-property';
import {BehaviorSubject} from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class AnatamogramHoverService {

/*  /!**
   *   initialize a private variable _data, it's a BehaviorSubject
   *!/
  private _data = new BehaviorSubject<string>(null);

  // change data to use getter and setter
  @Input()
  set tissue(value: string) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get tissue() {
    // get the latest value from _data BehaviorSubject
    const prop = this._data.getValue();
    /!*    if (prop && prop.label ==='IDG Disease') {
    /!*      prop.internalLink = '/diseases' + prop.href.split('/diseases')[1];
          console.log(prop);*!/
          prop.href = null;
        }*!/
    return prop;
  }*/

  private _tissueSource = new Subject<string>();


  tissues$ = this._tissueSource.asObservable();

  setTissue(tissue?: string) {
    this._tissueSource.next(tissue);
  }
}


