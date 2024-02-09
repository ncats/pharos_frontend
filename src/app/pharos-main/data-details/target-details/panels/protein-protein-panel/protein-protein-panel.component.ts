import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../../app/models/target';
import {PageData} from '../../../../../../app/models/page-data';
import {ActivatedRoute} from '@angular/router';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {TargetComponents} from '../../../../../models/target-components';
import {DataProperty} from '../../../../../tools/generic-table/components/property-display/data-property';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {ExploreListButtonComponent} from '../../../../../tools/explore-list-button/explore-list-button.component';
import {
  PropertyDisplayComponent
} from '../../../../../tools/generic-table/components/property-display/property-display.component';
import {TargetCardComponent} from '../../../../data-list/cards/target-card/target-card.component';
import {CommunityDataPanelComponent} from '../../../../../tools/community-data-panel/community-data-panel.component';

/**
 * shows a list of protein to protein interactions for a target
 */
@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, FlexLayoutModule, ScrollspyDirective, ComponentHeaderComponent, ExploreListButtonComponent, MatPaginator, PropertyDisplayComponent, TargetCardComponent, CommunityDataPanelComponent],
  selector: 'pharos-protein-protein-panel',
  templateUrl: './protein-protein-panel.component.html',
  styleUrls: ['./protein-protein-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProteinProteinPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  /**
   * @param pharosApiService
   * @param _route
   * @param {NavSectionsService} navSectionsService
   * @param changeRef
   */
  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }
  /**
   * parent target
   */
  @Input() target: Target;

  /**
   * list of all targets
   * @type {any[]}
   */
  ppis: any = {};

  targetProps: any;

  pageData: PageData = new PageData({});

  /**
   * this gets all ppi targets
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target?.ppiCount > 0) {
          this.showSection();
        } else {
          this.hideSection();
        }
        this.loadingComplete();
        this.changeRef.markForCheck();

        this.pageData = new PageData({
          total: this.target?.ppiCount,
          skip: 0,
          top: 10
        });
      });
  }
  /**
   * paginate the list of targets
   * @param event
   */
  paginate(event: PageEvent) {
    this.loadingStart();
    this.pageData.skip = event.pageIndex * event.pageSize;
    const pageParams = {
      ppistop: event.pageSize,
      ppisskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, TargetComponents.Component.ProteinProteinInteractions)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({next: res => {
        try {
          const retTarget: any = JSON.parse(JSON.stringify(res.data.targets.target ? res.data.targets.target : res.data.targets));
          if (retTarget.ppiCount.length > 0) {
            retTarget.ppiCount = retTarget.ppiCount.reduce((prev, cur) => Math.max(prev, cur.value), 0);
          }
          retTarget.ppis = retTarget.ppis.map(ppi => {
            if (!ppi.target) {return ppi; }
            ppi.target.properties = [];
            for (let j = 0; j < ppi.props.length; j++) {
              ppi.target.properties.push(
                new DataProperty(
                  {label: ppi.props[j].name, term: ppi.props[j].value}
                )
              );
            }
            return ppi.target;
          });

          this.target = retTarget;
          this.loadingComplete(false);
          this.changeRef.markForCheck();
        }
        catch (e){
          throw(e);
        }
      },
      error: (err) => {
        throw err;
      }});
  }
}
