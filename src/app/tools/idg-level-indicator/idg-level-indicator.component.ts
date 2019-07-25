import {Component, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {PharosProperty} from '../../models/pharos-property';

/**
 * UI component to display the idg level of a target using Material Design chip
 */
@Component({
  selector: 'pharos-idg-level-indicator',
  templateUrl: './idg-level-indicator.component.html',
  styleUrls: ['./idg-level-indicator.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdgLevelIndicatorComponent {
  /** String to be displayed background level correlates to level and is set in parent scss file*/
  @Input() level: string;
  @Input() disabled = false;

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<PharosProperty>(null);

// change data to use getter and setter
  @Input()
  set data(value: PharosProperty) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get data(): PharosProperty {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }


  constructor() {}

  ngOnInit() {
    this._data.subscribe(res => {
      if (res) {
        this.level = res.term as string;
      }
    });
  }
}
