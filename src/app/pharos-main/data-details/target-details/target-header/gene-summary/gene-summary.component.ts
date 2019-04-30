import {Component, Input, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {Target} from "../../../../../models/target";
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'pharos-gene-summary',
  templateUrl: './gene-summary.component.html',
  styleUrls: ['./gene-summary.component.scss']
})
export class GeneSummaryComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;
  description: string;
  truncatedDescription: string;
  geneSummary: string;
  fullDescription = true;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    super();
  }

  ngOnInit() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data.geneSummary) {
          this.ngUnsubscribe.next();
          this.setterFunction();
        }
      });
  }

  setterFunction() {
    if (this.data.geneSummary) {
      this.geneSummary = this.data.geneSummary.map(sum => sum.text).join(' ');
      if(this.target.description) {
        this.description = this.target.description ? this.target.description.concat(`<br> ${this.geneSummary}`) : this.geneSummary;
      }
    }else {
      this.description = this.target.description;
    }
    if (this.description && this.description.length > 1000) {
      this.fullDescription = false;
      this.truncatedDescription = this.description.slice(0, 1000);
    }
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.fullDescription = false;
      this.truncatedDescription = this.description.slice(0, 500);
    }
  }


}
