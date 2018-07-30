import {Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../models/target';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.scss']
})
export class TargetHeaderComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;
  description: string;
  truncatedDescription: string;
  geneSummary: string;
  fullDescription = true;

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
        }
      });
    this.description = this.target.description;
  }

  setterFunction() {
    if (this.data.geneSummary) {
      this.geneSummary = this.data.geneSummary.map(sum => sum.text).join(' ');
      this.description = this.target.description.concat(this.geneSummary);
    }
    if(this.description.length > 1000){this.fullDescription = false;
      this.truncatedDescription = this.description.slice(0,1000)}
  }

  getHeaderClass(): string {
      return this.target.idgTDL.toLowerCase() + '-header';
  }
}
