import {Component, Input} from '@angular/core';
import {DataProperty} from './data-property';

/**
 * component to display a property, primarily in a table
 */
@Component({
  selector: 'ncats-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss']
})

export class PropertyDisplayComponent {

  @Input() showLabel = true;

  @Input() property: DataProperty;

}
