import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class HeaderOptionsService {

private options = {searchBar: true, animationState: 'in'};
  // Observable string sources
  private headerOptions = new BehaviorSubject<{searchBar?: boolean, animationState: string}>(this.options);

  // Observable string streams
  headerOptions$ = this.headerOptions.asObservable();

  setOptions(options: any) {
    this.headerOptions.next(options);
  }
}
