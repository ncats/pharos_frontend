import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../models/target';
import {DataProperty} from "../../../../tools/generic-table/components/property-display/data-property";

/**
 * component to display a consolidated target view
 */
@Component({
  selector: 'pharos-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetCardComponent implements OnInit {
  /**
   * target to display. optional because it may also get injected
   */
  @Input() target?: Target;
  @Input() apiSources: any[];
  /**
   * boolean to display knowedge chart under radar chart
   * @type {boolean}
   */
  @Input() showKnowledge = false;

  constructor() {}

  /**
   * if target exists, fetch radar chart data
   */
  ngOnInit() {
    // todo add harmonizome serializer or find out why mapped list data in the resolver doesn't work
    if (this.target.hgdata) {
      const data = this.target.hgdata as any;
      if (data.summary) {
        this.target.hgdata = data.summary;
      }
    }
  }

  getDisplayProp(prop: DataProperty){
    prop.tooltip = this.getTooltip(prop.label);
    return prop
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
