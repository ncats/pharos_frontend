import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {PageData} from '../../../../../models/page-data';
import {SharedPathwayDetails} from '../../../../../models/target';

@Component({
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
    return [this.target.preferredSymbol, ...this.target.nearestTclin.upstream.map(t => t.tClinTarget.preferredSymbol),
      ...this.target.nearestTclin.downstream.map(t => t.tClinTarget.preferredSymbol)
    ].join(',');
  }
}
