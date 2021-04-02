import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {PharosProperty} from '../../../../../models/pharos-property';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {PharosPoint} from '../../../../../models/pharos-point';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Subject} from 'rxjs';

@Component({
  selector: 'pharos-gwas-analytics',
  templateUrl: './gwas-analytics.component.html',
  styleUrls: ['./gwas-analytics.component.scss']
})
export class GwasAnalyticsComponent extends DynamicPanelComponent implements OnInit {

  constructor(public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  @Input() target: Target;
  @Input() targetProps: any;
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'trait',
      label: 'GWAS Trait',
      width: '250vw'
    }),
    new PharosProperty({
      name: 'efoID',
      label: 'EFO ID',
      width: '100vw'
    }),
    new PharosProperty({
      name: 'studyCount',
      label: 'Study Count',
      width: '100vw'
    }),
    new PharosProperty({
      name: 'snpCount',
      label: 'SNP Count',
      width: '100vw'
    }),
    new PharosProperty({
      name: 'betaCount',
      label: 'Beta Count',
      width: '100vw'
    }),
    new PharosProperty({
      name: 'meanRankScore',
      label: 'Evidence (Mean Rank Score)',
      width: '100vw'
    }),
    new PharosProperty({
      name: 'provLink',
      label: 'Provenance',
      width: '10vw'
    })
  ];

  /**
   * display options for the tinx plot
   */
  chartOptions: ScatterOptions = new ScatterOptions({
    // line: false,
    // xAxisScale: 'log',
    // yAxisScale: 'log',
    xLabel: 'Mean Rank Score',
    yLabel: 'Beta Count',
    yBuffer: 1,
    margin: {top: 20, right: 175, bottom: 25, left: 35}
  });

  tigaData: PharosPoint[];

  ngOnInit(): void {this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(x => {
      this.target = this.data.targets;
      this.targetProps = this.data.targetsProps;
      this.tigaData = [];
      if (this.target?.gwasAnalytics?.associations.length > 0) {
        this.navSectionsService.showSection(this.field);
        this.target.gwasAnalytics.associations.map(assoc => {
          if (assoc.meanRankScore) {
            const p: PharosPoint = new PharosPoint({
              label: assoc.efoID,
              x: assoc.meanRankScore,
              y: assoc.betaCount,
              name: assoc.trait
            });
            this.tigaData.push(p);
          }
        });
      } else {
        this.navSectionsService.hideSection(this.field);
      }

      this.loadingComplete();
    });
  }

}
