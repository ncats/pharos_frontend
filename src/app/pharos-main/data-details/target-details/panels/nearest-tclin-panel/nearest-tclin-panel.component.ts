import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {ExploreListButtonComponent} from '../../../../../tools/explore-list-button/explore-list-button.component';
import {NearbyTargetListComponent} from './nearby-target-list/nearby-target-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [
      CommonModule,
      MatTabsModule,
    TargetPanelBaseComponent,
    ExploreListButtonComponent,
    NearbyTargetListComponent
  ],
  selector: 'pharos-nearest-tclin-panel',
  templateUrl: './nearest-tclin-panel.component.html',
  styleUrls: ['./nearest-tclin-panel.component.scss']
})
export class NearestTclinPanelComponent extends TargetPanelBaseComponent implements OnInit {
  constructor(
    changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService)
  {
    super(changeRef, dynamicServices);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initialize() {
    super.initialize();
  }

  hasData(): boolean {
    return this && this.target && this.target.nearestTclin && (this.target.nearestTclin.upstream.length > 0 || this.target.nearestTclin.downstream.length > 0);
  }

  count(): number {
    return this.target?.nearestTclin?.upstream?.length + this.target?.nearestTclin?.downstream?.length;
  }

  getList() {
    if (this.target) {
      return [this.target.preferredSymbol, ...this.target.nearestTclin.upstream.map(t => t.tClinTarget.preferredSymbol),
        ...this.target.nearestTclin.downstream.map(t => t.tClinTarget.preferredSymbol)
      ].join('|');
    }
    return [];
  }
}
