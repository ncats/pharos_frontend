import {Component, OnInit} from '@angular/core';
import {DynamicPanelComponent} from "../../../tools/dynamic-panel/dynamic-panel.component";
import {DynamicServicesService} from "../../../pharos-services/dynamic-services.service";
import {TourType} from "../../../models/tour-type";

@Component({
  selector: 'pharos-hierarchy-viewer',
  templateUrl: './hierarchy-viewer.component.html',
  styleUrls: ['./hierarchy-viewer.component.scss']
})

export class HierarchyViewerComponent extends DynamicPanelComponent implements OnInit {
  tourType: TourType;
  constructor(
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this.tourType = TourType.ShortValueCounts;
    this.loadingComplete(false);
  }


}
