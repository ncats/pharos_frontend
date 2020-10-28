import {Component, Inject, Input, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../models/target";
import {takeUntil} from "rxjs/operators";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {PageEvent} from "@angular/material/paginator";
import {TargetComponents} from "../../../../../models/target-components";
import {DataProperty} from "../../../../../tools/generic-table/components/property-display/data-property";
import {VirusDetails} from "../../../../../models/virus-interactions";
import {isPlatformBrowser} from "@angular/common";

@Component({
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
  constructor(private navSectionsService: NavSectionsService,
    @Inject(PLATFORM_ID) private platformID: Object) {
    super();
  }

  confirmed() {
    return this.target.interactingViruses.filter(virus => virus.confirmed()).length;
  }
  predicted() {
    return this.target.interactingViruses.filter(virus => !virus.confirmed()).length;
  }

  countString(){
    const conf = this.confirmed();
    const pred = this.predicted();
    if(conf && pred){
      return `${pred} Predicted, ${conf} Confirmed`;
    }
    if(conf){
      return `${conf} Confirmed`;
    }
    if(pred){
      return `${pred} Predicted`;
    }
    return '0';
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if(isPlatformBrowser(this.platformID)) {
          this.target = this.data.targets;
          if (this.target?.interactingViruses?.length > 0) {
            this.setterFunction();
            this.navSectionsService.showSection(this.field);
          } else {
            this.navSectionsService.hideSection(this.field);
          }
          this.loading = false;
        }
      });
  }


  visibleList: VirusDetails[];

  setterFunction() : void {
    this.visibleList = this.target.interactingViruses.slice(0, 10);
  }

  /**
   * paginate the list of targets
   * @param event
   */
  paginate(event: PageEvent) {
    let startNum = event.pageIndex * event.pageSize;
    this.visibleList = this.target.interactingViruses.slice(startNum, startNum + event.pageSize);
  }


  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
