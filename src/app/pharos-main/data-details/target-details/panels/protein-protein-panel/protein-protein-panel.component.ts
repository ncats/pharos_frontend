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
import {HttpClient} from '@angular/common/http';
import {Target, TargetSerializer} from '../../../../../../app/models/target';
import {PageData} from '../../../../../../app/models/page-data';
import {map, zipAll} from 'rxjs/operators';
import {from} from 'rxjs/index';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DiseaseSerializer} from '../../../../../models/disease';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {TargetComponents} from "../../../../../models/target-components";
import {DataProperty} from "../../../../../tools/generic-table/components/property-display/data-property";
import {BreakpointObserver} from "@angular/cdk/layout";

/**
 * shows a list of protein to protein interactions for a target
 */
@Component({
  selector: 'pharos-protein-protein-panel',
  templateUrl: './protein-protein-panel.component.html',
  styleUrls: ['./protein-protein-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProteinProteinPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
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
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
  }

  /**
   * this gets all ppi targets
   */
  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        this.loadingComplete();
        this.changeRef.markForCheck();

        this.pageData = new PageData({
          total: this.target.ppiCount,
          skip: 0,
          top: 10
        });
      });
  }

  pageData: PageData = new PageData({});
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
      .subscribe({next: res => {
        try {
          const retTarget: any = res.data.targets.target ? res.data.targets.target : res.data.targets;
          if (retTarget.ppiCount.length > 0) {
            retTarget.ppiCount = retTarget.ppiCount.reduce((prev, cur) => Math.max(prev, cur.value), 0);
          }
          retTarget.ppis = retTarget.ppis.map(ppi => {
            if(!ppi.target) {return ppi;}
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
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
        catch(e){
          throw(e);
        }
      },
      error: (err) => {
        throw err;
      }});
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
