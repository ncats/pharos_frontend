import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {PharosProperty} from '../../../../../models/pharos-property';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {PharosPoint} from '../../../../../models/pharos-point';
import {
  ScatterPlotComponent,
  ScatterPlotData
} from '../../../../../tools/visualizations/scatter-plot/scatter-plot.component';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {
  PropertyDisplayComponent
} from '../../../../../tools/generic-table/components/property-display/property-display.component';
import {GenericTableComponent} from '../../../../../tools/generic-table/generic-table.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  standalone: true,
  imports: [
    CommonModule, MatCardModule, FlexLayoutModule,
    ComponentHeaderComponent, ScrollspyDirective, PropertyDisplayComponent, ScatterPlotComponent, GenericTableComponent
  ],
  selector: 'pharos-gwas-target-analytics',
  templateUrl: './gwas-target-analytics.component.html',
  styleUrls: ['./gwas-target-analytics.component.scss']
})
export class GwasTargetAnalyticsComponent extends DynamicPanelComponent implements OnInit {

  constructor(
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
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
      name: 'studyCountForAssoc',
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
    .pipe(takeUntil(this.ngUnsubscribe))
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
        this.showSection();
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
        this.hideSection();
      }

      if (!this.allGenesEqual()) {
        if (!this.fields.find(f => f.name === 'ensgID')) {
          this.fields.splice(2, 0, new PharosProperty({
            name: 'ensgID',
            label: 'ENSG ID',
            width: '100vw'
          }));
        }
      }
      this.loadingComplete();
    });
  }

  allGenesEqual(){
    const firstEnsg = this.target?.gwasAnalytics?.associations[0].ensgID;
    let foundMultiple = false;
    this.target?.gwasAnalytics?.associations.forEach(assoc => {
      if (!foundMultiple && assoc.ensgID !== firstEnsg) {
        foundMultiple = true;
      }
    });
    return !foundMultiple;
  }
}
