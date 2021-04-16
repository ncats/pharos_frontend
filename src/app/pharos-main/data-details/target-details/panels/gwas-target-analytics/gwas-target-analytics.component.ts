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
import {ScatterPlotData} from '../../../../../tools/visualizations/scatter-plot/scatter-plot.component';

@Component({
  selector: 'pharos-gwas-target-analytics',
  templateUrl: './gwas-target-analytics.component.html',
  styleUrls: ['./gwas-target-analytics.component.scss']
})
export class GwasTargetAnalyticsComponent extends DynamicPanelComponent implements OnInit {

  constructor(public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  @Input() target: Target;
  @Input() targetProps: any;
  shortFields: PharosProperty[] = [new PharosProperty({
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
      name: 'betaCount',
      label: 'Beta Count',
      width: '100vw'
    }),
    new PharosProperty({
      name: 'medianOddsRatio',
      label: 'Odds Ratio',
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
    })];


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
      name: 'medianOddsRatio',
      label: 'Odds Ratio',
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

  scatterPlotData: ScatterPlotData[] = [];

  ngOnInit(): void {this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(x => {
      this.target = this.data.targets;
      this.targetProps = this.data.targetsProps;

      const betaCountPlot = new ScatterPlotData();
      betaCountPlot.data = [];
      betaCountPlot.selected = true;
      betaCountPlot.options = new ScatterOptions({
        xLabel: 'Mean Rank Score',
        yLabel: 'Beta Count',
        yBuffer: 1,
        margin: {top: 20, right: 35, bottom: 50, left: 50}
      });

      const orPlot = new ScatterPlotData();
      orPlot.data = [];
      orPlot.options = new ScatterOptions({
        xLabel: 'Mean Rank Score',
        yLabel: 'Odds Ratio',
        yBuffer: 1,
        margin: {top: 20, right: 35, bottom: 50, left: 50}
      });

      this.scatterPlotData = [betaCountPlot, orPlot];
      if (this.target?.gwasAnalytics?.associations.length > 0) {
        this.navSectionsService.showSection(this.field);
        this.target.gwasAnalytics.associations.forEach(assoc => {
          if (assoc.medianOddsRatio) {
            const p: PharosPoint = new PharosPoint({
              label: assoc.efoID,
              x: assoc.meanRankScore,
              y: assoc.medianOddsRatio,
              name: assoc.trait
            });
            orPlot.data.push(p);
          }
          if (assoc.meanRankScore) {
            const p: PharosPoint = new PharosPoint({
              label: assoc.efoID,
              x: assoc.meanRankScore,
              y: assoc.betaCount,
              name: assoc.trait
            });
            betaCountPlot.data.push(p);
          }
        });
      } else {
        this.navSectionsService.hideSection(this.field);
      }

      this.loadingComplete();
    });
  }

}
