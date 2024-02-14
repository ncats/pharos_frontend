import {Component, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {TourType} from '../../../models/tour-type';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {ComponentHeaderComponent} from '../../../tools/component-header/component-header.component';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, ComponentHeaderComponent],
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
