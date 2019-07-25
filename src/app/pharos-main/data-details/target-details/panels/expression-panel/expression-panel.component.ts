import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatTabChangeEvent} from '@angular/material';
import {PharosProperty} from '../../../../../models/pharos-property';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {AnatamogramHoverService} from '../../../../../tools/anatamogram/anatamogram-hover.service';
import {PharosConfig} from '../../../../../../config/pharos-config';

// todo: clean up tabs css when this is merges/released: https://github.com/angular/material2/pull/11520
@Component({
  selector: 'pharos-expression-panel',
  templateUrl: './expression-panel.component.html',
  styleUrls: ['./expression-panel.component.scss']
})
export class ExpressionPanelComponent extends DynamicPanelComponent implements OnInit {
  tissues: string[] = [
    'UBERON_0001897',
    'UBERON_0001898',
    'UBERON_0002421',
    'UBERON_0003027',
    'UBERON_0001876',
    'UBERON_0001870',
    'UBERON_0001871',
    'UBERON_0001021',
    'UBERON_0006618',
    'UBERON_0012249',
    'UBERON_0002421',
    'UBERON_0000977',
    'UBERON_0002185',
    'UBERON_0003126',
    'UBERON_0002048',
    'UBERON_0002372',
    'UBERON_0000970',
    'UBERON_0001876',
    'UBERON_0001736',
    'UBERON_0001264',
    'UBERON_0002107',
    'UBERON_0001155',
    'UBERON_0002371',
    'UBERON_0001255',
    'UBERON_0000945',
    'UBERON_0002114',
    'UBERON_0001000',
    'UBERON_0000998',
    'UBERON_0000473',
    'UBERON_0001301',
    'UBERON_0000970',
    'UBERON_0002372',
    'UBERON_0002048',
    'UBERON_0001876',
    'UBERON_0003126',
    'UBERON_0002185',
    'UBERON_0001021',
    'UBERON_0002037',
    'UBERON_0002245',
    'UBERON_0002113',
    'UBERON_0001225',
    'UBERON_0002046',
    'UBERON_0002371',
    'UBERON_0001870'
  ];

  @ViewChild('radar', {read: RadarChartComponent, static: false}) radarComponent: RadarChartComponent;

  _URL: string;
  id: string;
  tissueData: Map<string, PharosProperty[]> = new Map<string, PharosProperty[]>();
  hgData: any[] = [];
  imgUrl: string;
  tableArr: any[];

  radarData: any[] = [];

  sources: any[] = [
    {label: 'GTEx Tissue', name: 'gtex'},
    {label: 'HPM Tissue', name: 'hpm'},
    {label: 'HPA RNA Tissue', name: 'hpa'},
    {label: 'IDG Tissue', name: 'gtex'},
    {label: 'UniProt Tissue', name: 'uniprot'},
    {label: 'Jensen-KB Tissue', name: 'jensen-kb'},
    {label: 'Jensen-TM Tissue', name: 'jensen-tm'},
    {label: 'IDG Tissue Ref', name: 'gtex'}
  ];

  sourceList = [];
  selectedTab: number;

  constructor(private navSectionsService: NavSectionsService,
              private pharosConfig: PharosConfig,
              private anatamogramHoverService: AnatamogramHoverService) {
    super();
  }

  ngOnInit() {
    // https://pharos.ncats.io/idg/api/v1/expression?acc=P25092
    this._URL = this.pharosConfig.getHomunculusUrl(this.id);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
          this.loading = false;
        }
      });
  }

  setterFunction() {
    if (this.data.expression) {
      this.tissueData.clear();
      this.mapTissueData();
      this.hgData = this.tissueData.get(this.sources[0].label);
      this.imgUrl = this._URL + this.sourceList[0].name;
    }

    if (this.data.specificity) {
      this.radarData = [];
      const axes: any [] = [];
      this.data.specificity.forEach(data => {
        axes.push({axis: data.label, value: data['numval']});
      });
      this.radarData.push({className: this.id, axes: axes});
    }

  }

  mapTissueData(): void {
    this.data.expression.forEach(tissue => {
      const tissueTerm: PharosProperty = new PharosProperty(tissue);
      const tissueArr: PharosProperty[] = this.tissueData.get(tissueTerm.label);
      if (tissueArr) {
        tissueArr.push(tissueTerm);
        this.tissueData.set(tissueTerm.label, tissueArr);
      } else {
        this.tissueData.set(tissueTerm.label, [tissueTerm]);
      }
    });
    const keys = Array.from(this.tissueData.keys());
    this.sourceList = this.sources.filter(source => keys.includes(source.label));
  }

  getData(field: string): PharosProperty[] {
    return this.tissueData.get(field);
  }

  getSourceCount(source: string): number {
    return this.tissueData.get(source) ? this.tissueData.get(source).length : 0;
  }

  changeHarminogramTabData(event: MatTabChangeEvent) {
    this.hgData = this.tissueData.get(this.sourceList[event.index].label);
    this.imgUrl = this._URL + this.sourceList[event.index].name;

  }

  /**
   * set tissue that is hovered from list
   * @param {string} tissue
   */
  setHover(tissue?: string) {
    this.anatamogramHoverService.setTissue(tissue);
  }

  drawRadar(change: MatTabChangeEvent) {
    this.selectedTab = change.index;
  }

  /**
   * redraws radar chart when the tab changes, this is due to the lazy loaded tabs
   */
  doneAnimating() {
    if (this.selectedTab === 1) {
      this.radarComponent.drawChart();
      this.radarComponent.updateChart();
    }
  }

  getTooltip(label: string): string {
    return this.apiSources.filter(source => source.field === label)[0].description;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
