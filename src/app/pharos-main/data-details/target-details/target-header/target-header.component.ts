import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Target, TargetSerializer} from '../../../../models/target';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.scss'],
  encapsulation: ViewEncapsulation.None
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
     this._data
     // listen to data as long as term is undefined or null
     // Unsubscribe once term has value
       .pipe(
         takeUntil(this.ngUnsubscribe)
       )
       .subscribe(x => {
         if (this.data && this.data.targets) {
           this.target = this.data.targets;
           if (this.target) {
             this.ngUnsubscribe.next();
           }
         }
       });
  }

  getHeaderClass(): string {
      return this.target.idgTDL.toLowerCase() + '-header';
  }
}
