import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

/**
 * injectable service to track header options, This allows components to change the header features, while the header is only created once
 */
@Injectable({
  providedIn: 'root'
})
export class HeaderOptionsService {
  /**
   * track whether or not to show the search bar, and sets animation state/background color
   */
  private options = {searchBar: true, animationState: 'in'};
  /**
   * observable string and boolean sources to return changes
   */
  private headerOptions = new BehaviorSubject<{ searchBar?: boolean, animationState: string }>(this.options);

  /**
   * options subject returned as observable
   */
  headerOptions$ = this.headerOptions.asObservable();

  /**
   * change and broadcast options changes
   * @param options
   */
  setOptions(options: any) {
    this.headerOptions.next(options);
  }
}
