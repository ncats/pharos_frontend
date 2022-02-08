import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: ''
})
export class DynamicPanelBaseComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor() { }

  /**
   * api sources, mainly used for the definitions
   */
  @Input() apiSources: any[];

  ngOnInit(): void {
  }

  getTooltip(label: string): string {
    if (this.apiSources) {
      const tooltip = this.apiSources.filter(source => source.field === label);
      if (tooltip.length) {
        return tooltip[0].description;
      } else {
        return null;
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
