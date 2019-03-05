import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Target} from "../../../../../models/target";
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {MatDialog} from "@angular/material";
import {takeUntil} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-level-summary',
  templateUrl: './level-summary-panel.component.html',
  styleUrls: ['./level-summary-panel.component.scss']
})
export class LevelSummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

 constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
