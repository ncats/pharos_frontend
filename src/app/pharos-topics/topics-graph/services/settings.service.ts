import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Settings {
  targetLabel: string;
  compoundLabel: string;
  patternLabel: string;
  showLinkLabel: boolean;
  databases: [string];

  constructor() {}
}

@Injectable()
export class SettingsService {
  sidenav: any;
  settings: Settings = new Settings();
  dataChange: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(this.settings);

  constructor() {
    this.settings.targetLabel = 'genes';
    this.settings.compoundLabel = 'hash';
    this.dataChange.next(this.settings);
  }

}

