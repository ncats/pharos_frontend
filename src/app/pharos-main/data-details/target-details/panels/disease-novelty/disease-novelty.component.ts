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
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {Target} from '../../../../../models/target';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {PackCircleConfig} from "../../../../../tools/visualizations/pack-circle/pack-circle.component";

@Component({
  selector: 'pharos-disease-novelty',
  templateUrl: './disease-novelty.component.html',
  styleUrls: ['./disease-novelty.component.scss']
})
export class DiseaseNoveltyComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

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
  /**
   * tnx data
   */
  tinx: PharosPoint[];

  /**
   * display options for the tinx plot
   */
  chartOptions: ScatterOptions = new ScatterOptions({
    line: false,
    xAxisScale: 'log',
    yAxisScale: 'log',
    xLabel: 'Novelty',
    yLabel: 'Importance',
    margin: {top: 20, right: 35, bottom: 50, left: 50}
  });

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
    return this.target && (this.tinx && this.tinx.length > 0);
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

          if (this.target && this.target.tinx) {
            this.tinx = [];
            this.target.tinx.map(point => {
              if (point.disease) {
                const p: PharosPoint = new PharosPoint({
                  label: point.disease.doid,
                  x: point.novelty,
                  y: point.score,
                  name: point.disease.name
                });
                this.tinx.push(p);
              }
            });
          }

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
}


