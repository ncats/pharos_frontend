import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from '../../../../tools/sidenav-panel/services/nav-sections.service';
import {PharosProperty} from '../../../../models/pharos-property';
import {ScatterPlotData} from '../../../../tools/visualizations/scatter-plot/scatter-plot.component';
import {takeUntil} from 'rxjs/operators';
import {ScatterOptions} from '../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {PharosPoint} from '../../../../models/pharos-point';
import {Disease} from '../../../../models/disease';

@Component({
  selector: 'pharos-gwas-disease-analytics',
  templateUrl: './gwas-disease-analytics.component.html',
  styleUrls: ['./gwas-disease-analytics.component.scss']
})
export class GwasDiseaseAnalyticsComponent extends DynamicPanelComponent implements OnInit {

  constructor(public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  @Input() disease: Disease;
  @Input() diseaseProps: any;
  shortFields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Target',
      width: '250vw'
    }),
    new PharosProperty({
      name: 'idgTDL',
      label: 'TDL',
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
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Target',
      width: '250vw'
    }),
    new PharosProperty({
      name: 'idgTDL',
      label: 'TDL',
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
      this.disease = this.data.diseases;
      this.diseaseProps = this.data.diseasesProps;

      const betaCountPlot = new ScatterPlotData();
      betaCountPlot.data = [];
      betaCountPlot.selected = true;
      betaCountPlot.options = new ScatterOptions({
        xLabel: 'Mean Rank Score',
        yLabel: 'Beta Count',
        yBuffer: 1,
        margin: {top: 20, right: 175, bottom: 25, left: 35}
      });

      const orPlot = new ScatterPlotData();
      orPlot.data = [];
      orPlot.options = new ScatterOptions({
        xLabel: 'Mean Rank Score',
        yLabel: 'Odds Ratio',
        yBuffer: 1,
        margin: {top: 20, right: 175, bottom: 25, left: 35}
      });

      this.scatterPlotData = [betaCountPlot, orPlot];
      if (this.disease?.gwasAnalytics?.associations.length > 0) {
        this.navSectionsService.showSection(this.field);
        this.disease.gwasAnalytics.associations.forEach(assoc => {
          if (assoc.medianOddsRatio) {
            const p: PharosPoint = new PharosPoint({
              label: assoc.target.gene,
              x: assoc.meanRankScore,
              y: assoc.medianOddsRatio,
              name: assoc.target.name
            });
            orPlot.data.push(p);
          }
          if (assoc.meanRankScore) {
            const p: PharosPoint = new PharosPoint({
              label: assoc.target.gene,
              x: assoc.meanRankScore,
              y: assoc.betaCount,
              name: assoc.target.name
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
