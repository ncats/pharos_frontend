import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: ''
})
export class DynamicPanelBaseComponent implements OnInit {

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
}
