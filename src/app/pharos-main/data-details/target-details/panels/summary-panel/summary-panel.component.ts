import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatDialog} from '@angular/material';
import { takeUntil} from 'rxjs/operators';
import {RadarChartViewerComponent} from "../../../../../tools/radar-chart-viewer/radar-chart-viewer.component";
import {Target} from "../../../../../models/target";



@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  @Input() target: Target;

  // todo: known bug in angular prevents this from working. Angular 6 may fix it, but flex would also need to be updated.
  // todo: https://github.com/angular/angular/issues/11716 https://github.com/angular/angular/issues/8785
/*  @HostBinding('attr.fxFlex')
  flex = this.width;*/

  constructor(
    public dialog: MatDialog
  ) {
    super();
  }

ngOnInit() {
    console.log(this);
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

openModal(): void {
  const dialogRef = this.dialog.open(RadarChartViewerComponent, {
    height: '90vh',
    width: '85vw',
    data: { data: this.data.knowledge,
            id: this.data.knowledge[0].className,
      target: this.target,
      size: 'large'}
  });
}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
