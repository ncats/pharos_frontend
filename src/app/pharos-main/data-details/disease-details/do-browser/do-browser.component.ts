import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../models/disease";
import {takeUntil} from "rxjs/operators";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";

@Component({
  selector: 'pharos-do-browser',
  templateUrl: './do-browser.component.html',
  styleUrls: ['./do-browser.component.scss']
})
export class DoBrowserComponent extends DynamicPanelComponent implements OnInit {

  @Input() disease: Disease;
  @Input() data: any;
  constructor(
    private changeRef: ChangeDetectorRef) {
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
        this.disease = this.data.diseases;
        this.changeRef.markForCheck();
      });
  }

}
