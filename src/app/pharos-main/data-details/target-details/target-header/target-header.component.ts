import {Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../models/target';
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.scss']
})
export class TargetHeaderComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;

  geneSummary: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
      .subscribe(x => {
        if(this.data.geneSummary){
          this.geneSummary = this.data.geneSummary.map(sum => sum.text).join(' ');
        }
      });
  }

  getHeaderClass(): string {
      return this.target.idgTDL.toLowerCase() + '-header';
  }
}
