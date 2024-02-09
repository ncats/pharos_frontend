import {Component, Input, OnInit} from '@angular/core';
import {DataResource} from '../../../../../../models/idg-resources/data-resource';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {
  PropertyDisplayComponent
} from '../../../../../../tools/generic-table/components/property-display/property-display.component';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * Component to show a single data resource's information
 */
@Component({
  standalone: true,
  imports: [MatCardModule, CommonModule, PropertyDisplayComponent, FlexLayoutModule],
  selector: 'pharos-data-resource-panel',
  templateUrl: './data-resource-panel.component.html',
  styleUrls: ['../reagent-panel/reagent-panel.component.scss']
})
export class DataResourcePanelComponent implements OnInit {

  constructor() {
  }

  /**
   * the data resoure object
   */
  @Input() dataResource: DataResource;

  /**
   * retrieves a display name to show on the card
   */
  displayName() {
    return this.dataResource.title || this.dataResource.name;
  }

  ngOnInit(): void {
    return;
  }
}
