import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Target} from '../../../../../models/target';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-publication-statistics',
  templateUrl: './publication-statistics.component.html',
  styleUrls: ['./publication-statistics.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationStatisticsComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  /**
   * parent target
   */
  @Input() target: Target;

  targetProps: any;

  /**
   * timeline data array
   */
  pmscoreTimeline: PharosPoint[];

  /**
   * timeline data array
   */
  pubtatorTimeline: PharosPoint[];

  /**
   * timeline data array
   */
  patentTimeline: PharosPoint[];

  /**
   * chart configuration options
   */
  chartOptions: ScatterOptions = new ScatterOptions({
    line: true,
    xAxisScale: 'year',
    xLabel: 'Year',
    yAxisScale: 'linear',
    yLabel: 'Score',
    margin: {top: 20, right: 35, bottom: 50, left: 50}
  });

  /**
   *
   * @param _route
   * @param changeRef
   * @param pharosApiService
   * @param pharosConfig
   */
  constructor(private _route: ActivatedRoute,
              private changeRef: ChangeDetectorRef,
              private pharosApiService: PharosApiService,
              private pharosConfig: PharosConfig,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  /**
   * parse data as publication objects
   * set pagination objects
   * create timelines if data is available
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        this.targetProps = this.data.targetsProps;

        if (this.target.pubmedScores) {
          const values: Map<string, {year: number, score: number}> = new Map<string, {year: number, score: number}>();
          this.target.pubmedScores.forEach(val => {
            if (values.has(val.year)) {
                const vals = values.get(val.year);
                vals.score = vals.score + val.score;
                values.set(val.year, vals);
            } else {
              values.set(val.year, val);
            }
          });
          this.pmscoreTimeline = Array.from(values.values())
            .map(point => new PharosPoint({x: +point.year, y: point.score}));
        }

        if (this.target.pubTatorScores) {
          const values: Map<string, {year: number, score: number}> = new Map<string, {year: number, score: number}>();
          this.target.pubmedScores.forEach(val => {
            if (values.has(val.year)) {
              const vals = values.get(val.year);
              vals.score = vals.score + val.score;
              values.set(val.year, vals);
            } else {
              values.set(val.year, val);
            }
          });
          this.pubtatorTimeline = this.target.pubTatorScores.map(point => new PharosPoint({x: +point.year, y: +point.score}));
        }

        if (this.target.patentCounts) {
          const values: Map<string, {year: number, count: number}> = new Map<string, {year: number, count: number}>();
          this.target.patentCounts.forEach(val => {
            if (values.has(val.year)) {
              const vals = values.get(val.year);
              vals.count = vals.count + val.count;
              values.set(val.year, vals);
            } else {
              values.set(val.year, val);
            }
          });
          this.patentTimeline = this.target.patentCounts.map(point => new PharosPoint({x: +point.year, y: point.count}));
        }

        this.loadingComplete();
        this.changeRef.markForCheck();
      });
  }

  deDupeArr(arr: {year: string, score?: number, count?: number}[]): {year: string, score?: number, count?: number}[] {
    const values: Map<string, {year: string, score?: number, count?: number}> =
      new Map<string, {year: string, score?: number, count?: number}>();
    arr.forEach(val => {
      if (values.has(val.year)) {
        const vals = values.get(val.year);
        if (val.count) {
          vals.count = vals.count + val.count;
        }
        if (val.score) {
          vals.score = vals.score + val.score;
        }
        values.set(val.year, vals);
      } else {
        values.set(val.year, val);
      }
    });
    return Array.from(values.values());
  }
}
