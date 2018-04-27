import {Component, Input} from '@angular/core';

/**
 * UI component to display the idg level of a target using Material Design chip
 */
@Component({
  selector: 'pharos-idg-level-indicator',
  templateUrl: './idg-level-indicator.component.html',
  styleUrls: ['./idg-level-indicator.component.scss']
})
export class IdgLevelIndicatorComponent {
  /** String to be displayed background level correlates to level and is set in parent scss file*/
  @Input() level: string;
}
