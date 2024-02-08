import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ComponentHeaderComponent, CommonModule,
    ScrollspyDirective, MatCardModule,
  ],
  selector: 'pharos-target-panel-base',
  templateUrl: './target-panel-base.component.html',
  styleUrls: ['./target-panel-base.component.scss']
})
export class TargetPanelBaseComponent extends DynamicPanelComponent implements OnInit {
  /**
   * target to display
   */
  @Input() target: Target;
  @Input() child: TargetPanelBaseComponent;
  @Input() nodataMessage: string;
  @Input() prediction = false;

  constructor(
              protected changeRef: ChangeDetectorRef,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target && this.child) {
          const hasData = this.child?.hasData ? this.child.hasData.bind(this.child) : this.hasData;
          if (hasData()) {
            this.child.showSection();
            this.initialize();
          } else {
            this.child.hideSection();
          }
        }
        this.loadingComplete();
        this.changeRef.markForCheck();
      });
  }

  hasData(): boolean {
    return true;
  }

  count(): number {
    return null;
  }

  getLabel(): string {
    const count = this.child.count();
    if (count > 0){
      return this.child.label + ` (${count})`;
    }
    return this.child.label;
  }


  /**
   * initialize panel data, call super.initialize(this) from child class
   */
  initialize(): void {
  }
}
