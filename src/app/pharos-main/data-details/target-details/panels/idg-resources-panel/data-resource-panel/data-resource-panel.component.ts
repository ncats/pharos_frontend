import {Component, Input, OnInit} from '@angular/core';
import {DataResource} from "../../../../../../models/idg-resources/data-resource";

/**
 * Component to show a single data resource's information
 */
@Component({
  selector: 'pharos-data-resource-panel',
  templateUrl: './data-resource-panel.component.html',
  styleUrls: ['./data-resource-panel.component.scss', '../reagent-panel/reagent-panel.component.scss']
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
