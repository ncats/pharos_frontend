import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Target} from '../../../../../models/target';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

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
    margin: {top: 20, right: 35, bottom: 25, left: 35}
  });

  /**
   *
   * @param navSectionsService
   * @param _route
   * @param changeRef
   * @param pharosApiService
   * @param pharosConfig
   */
  constructor(private navSectionsService: NavSectionsService,
              private _route: ActivatedRoute,
              private changeRef: ChangeDetectorRef,
              private pharosApiService: PharosApiService,
              private pharosConfig: PharosConfig) {
    super();
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
          this.pmscoreTimeline = this.target.pubmedScores.map(point => new PharosPoint({x: +point.year, y: point.score}));
        }

        if (this.target.pubTatorScores) {
          this.pubtatorTimeline = this.target.pubTatorScores.map(point => new PharosPoint({x: +point.year, y: +point.score}));
        }

        if (this.target.patentCounts) {
          this.patentTimeline = this.target.patentCounts.map(point => new PharosPoint({x: +point.year, y: point.count}));
        }

        this.loading = false;
        this.changeRef.markForCheck();
      });
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  getTooltip(label: string): string {
    const tooltip = this.apiSources.filter(source => source.field === label);
    if (tooltip.length) {
      return tooltip[0].description;
    } else {
      return null;
    }
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
