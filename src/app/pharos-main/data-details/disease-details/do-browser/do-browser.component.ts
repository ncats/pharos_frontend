import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Disease} from '../../../../models/disease';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {ComponentHeaderComponent} from '../../../../tools/component-header/component-header.component';
import {ScrollspyDirective} from '../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {
    PropertyDisplayComponent
} from '../../../../tools/generic-table/components/property-display/property-display.component';
import {IdgLevelIndicatorComponent} from '../../../../tools/idg-level-indicator/idg-level-indicator.component';

@Component({
    standalone: true,
    imports: [CommonModule, FlexLayoutModule, MatCardModule, ComponentHeaderComponent, ScrollspyDirective, PropertyDisplayComponent, IdgLevelIndicatorComponent],
  selector: 'pharos-do-browser',
  templateUrl: './do-browser.component.html',
  styleUrls: ['./do-browser.component.scss']
})
export class DoBrowserComponent extends DynamicPanelComponent implements OnInit {

  @Input() disease: Disease;
  constructor(
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.disease = this.data.diseases;
        if (this.hasData()) {
          this.showSection();
        } else {
          this.hideSection();
        }
        this.changeRef.markForCheck();
      });
  }

  hasData(){
    return this.disease?.parents?.length > 0 || this.disease?.children?.length > 0;
  }
}
