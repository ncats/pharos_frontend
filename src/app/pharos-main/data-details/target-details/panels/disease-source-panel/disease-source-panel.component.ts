import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {DiseaseSerializer} from '../../../../../models/disease';
import {takeUntil} from 'rxjs/operators';
import {TargetComponents} from '../../../../../models/target-components';
import {isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {PackCircleConfig} from "../../../../../tools/visualizations/pack-circle/pack-circle.component";

/**
 * component to display disease source data
 */
@Component({
  selector: 'pharos-disease-source',
  templateUrl: './disease-source-panel.component.html',
  styleUrls: ['./disease-source-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiseaseSourceComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: any,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  /**
   * target to display
   */
  @Input() target: Target;

  @Input() targetProps: any;

  circlePackConfig: PackCircleConfig = {
    highlightCheck: (d, node) => node.__data__?.data?.oid === d.data?.oid,
    focusedCheck: (d, node) => {
      // if (this.expressionInfoService.focusedUberon && this.expressionInfoService.focusedUberon.uid) {
      //   return node.__data__?.data?.uid?.replace(':', '_') === this.expressionInfoService.focusedUberon?.uid;
      // }
      return false;
    },
    circleClick: (event, d, n) => {
      // const uid = d.data.uid;
      // this.expressionInfoService.setFocusedUberon(uid, 'circleplot');
    }
  }

  hasData() {
    return this.target && (this.target.diseaseCount > 0);
  }

  /**
   * subscribe to data changes and generate tree
   */
  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (isPlatformBrowser(this.platformID)) {
          this.target = this.data.targets;
          this.targetProps = this.data.targetsProps;

          if (this.hasData()) {
            this.showSection();
          } else {
            this.hideSection();
          }

          this.setterFunction();
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
      });
  }

  /**
   * parse data
   * creates map to reduce duplicate disease names, and adds sources to disease name
   */
  setterFunction(): void {
  }

  /**
   * paginate disease list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loadingStart();
    const diseaseSerializer = new DiseaseSerializer();
    const pageParams = {
      diseasetop: event.pageSize,
      diseaseskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, TargetComponents.Component.DiseaseSources)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.target.diseases = res.data.targets.diseases;
          this.targetProps.diseases = res.data.targets.diseases.map(disease => diseaseSerializer._asProperties(disease));
          this.setterFunction();
          this.loadingComplete(false);
          this.changeRef.markForCheck();
        }
      );
  }
}

