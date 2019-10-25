import {Component, Input, OnInit} from '@angular/core';
import {Target, TargetSerializer} from '../../../../models/target';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.scss']
})
export class TargetHeaderComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;

  targetSerializer: TargetSerializer = new TargetSerializer();
  /**
   * no args constructor
   * call super object constructor
   */
  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this);
    this.target =  this.targetSerializer.fromJson(this.target);

    /* this._data
     // listen to data as long as term is undefined or null
     // Unsubscribe once term has value
       .pipe(
         takeUntil(this.ngUnsubscribe)
       )
       .subscribe(x => {
         if (this.target) {
           this.ngUnsubscribe.next();
         }
       });*/
  }

  getHeaderClass(): string {
      return this.target.idgTDL.toLowerCase() + '-header';
  }
}
