import {Component, Input} from '@angular/core';
import {DataProperty} from './data-property';
import {ContingencyTable} from '../../../../models/facet';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon, MatIconModule} from '@angular/material/icon';

/**
 * component to display a property, primarily in a table
 */
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatTooltip, MatIconModule],
  selector: 'ncats-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss']
})

export class PropertyDisplayComponent {
  /**
   * show the label/field name
   * @type {boolean}
   */
  @Input() showLabel = true;

  JSON: any = JSON;
  /**
   * property object being shown
   */
  @Input() property: DataProperty;

  termIsTable() {
    return this.property.term instanceof ContingencyTable;
  }
}
