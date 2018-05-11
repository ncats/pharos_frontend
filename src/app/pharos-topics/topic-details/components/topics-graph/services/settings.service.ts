import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


/**
 * currently empty
 * todo: extend with needed graph settings
 */
export class Settings {
  /**
   * no args
   */
  constructor() {}
}

/**
 *  settings object,
 *  behaviour subject to broadcast settings
 */
@Injectable()
export class SettingsService {
  settings: Settings = new Settings();
  dataChange: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(this.settings);

  /**
   * set default parameters
   */
  constructor() {
    this.dataChange.next(this.settings);
  }

}

