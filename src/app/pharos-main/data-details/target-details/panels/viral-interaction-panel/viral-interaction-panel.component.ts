import {Component, Inject, Input, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {VirusDetails} from '../../../../../models/virus-interactions';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {ExploreListButtonComponent} from '../../../../../tools/explore-list-button/explore-list-button.component';
import {VirusDetailsComponent} from './virus-details/virus-details.component';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, ExploreListButtonComponent, MatPaginator,
    VirusDetailsComponent, ScrollspyDirective, ComponentHeaderComponent],
  selector: 'pharos-viral-interaction-panel',
  templateUrl: './viral-interaction-panel.component.html',
  styleUrls: ['./viral-interaction-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViralInteractionPanelComponent extends DynamicPanelComponent implements OnInit {
  /**
   * parent target
   */
  @Input() target: Target;
  visibleList: VirusDetails[];
  constructor(@Inject(PLATFORM_ID) private platformID: any,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  confirmed() {
    return this.target?.interactingViruses.filter(virus => virus.confirmed()).length;
  }
  predicted() {
    return this.target?.interactingViruses.filter(virus => !virus.confirmed()).length;
  }

  countString(){
    const conf = this.confirmed();
    const pred = this.predicted();
    if (conf && pred){
      return `${pred} Predicted, ${conf} Confirmed`;
    }
    if (conf){
      return `${conf} Confirmed`;
    }
    if (pred){
      return `${pred} Predicted`;
    }
    return '0';
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (isPlatformBrowser(this.platformID)) {
          this.target = this.data.targets;
          if (this.target?.interactingViruses?.length > 0) {
            this.setterFunction();
            this.showSection();
          } else {
            this.hideSection();
          }
          this.loadingComplete();
        }
      });
  }

  setterFunction(): void {
    this.visibleList = this.target.interactingViruses.slice(0, 10);
  }

  /**
   * paginate the list of targets
   * @param event
   */
  paginate(event: PageEvent) {
    const startNum = event.pageIndex * event.pageSize;
    this.visibleList = this.target.interactingViruses.slice(startNum, startNum + event.pageSize);
  }
}
