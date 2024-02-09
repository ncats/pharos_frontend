import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Target} from '../../../../../models/target';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {IdgLevelIndicatorComponent} from '../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {TdarkSummaryComponent} from './levels/tdark-summary/tdark-summary.component';
import {TbioSummaryComponent} from './levels/tbio-summary/tbio-summary.component';
import {TchemSummaryComponent} from './levels/tchem-summary/tchem-summary.component';
import {TclinSummaryComponent} from './levels/tclin-summary/tclin-summary.component';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * displays illumination progress for a target
 */
@Component({
    standalone: true,
    imports: [CommonModule, MatCardModule, ComponentHeaderComponent, ScrollspyDirective, IdgLevelIndicatorComponent,
    TdarkSummaryComponent, TbioSummaryComponent, TchemSummaryComponent, TclinSummaryComponent, FlexLayoutModule],
  selector: 'pharos-level-summary',
  templateUrl: './level-summary-panel.component.html',
  styleUrls: ['./level-summary-panel.component.scss']
})
export class LevelSummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * target displayed
   */
  @Input() target: Target;

  /**
   * properties object of target
   */
  @Input() targetProps: any;

  /**
   * fetch services
   * @param {ChangeDetectorRef} changeRef
   */
 constructor(private changeRef: ChangeDetectorRef,
             public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  /**
   * set objects from data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
          this.target = this.data.targets;
          this.targetProps = this.data.targetsProps;
          this.loadingComplete();
          this.changeRef.markForCheck();
      });
  }
}
