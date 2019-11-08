import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Target} from '../../../../models/target';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetHeaderComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;
  @Input() targetProps: any;

  /**
   * no args constructor
   * call super object constructor
   */
  constructor() {
    super();
  }

  ngOnInit() {
           this.target = this.data.targets;
  }

  getHeaderClass(): string {
      return this.target.idgTDL.toLowerCase() + '-header';
  }
}
