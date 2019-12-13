import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatTabChangeEvent, MatTreeNestedDataSource, PageEvent} from '@angular/material';
import {PharosProperty} from '../../../../../models/pharos-property';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {AnatamogramHoverService} from '../../../../../tools/anatamogram/anatamogram-hover.service';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {Target} from '../../../../../models/target';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {NestedTreeControl} from '@angular/cdk/tree';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {DiseaseSerializer} from '../../../../../models/disease';
import {DataProperty} from '../../../../../tools/generic-table/components/property-display/data-property';

// todo: make 1 node class/interface
/**
 * interface to track disease tree nodes
 */
interface ExpressionTreeNode {
  /**
   * disease name
   */
  name: PharosProperty;
  /**
   * list of children nodes
   */
  children?: ExpressionTreeNode[];
}


// todo: clean up tabs css when this is merges/released: https://github.com/angular/material2/pull/11520
/**
 * expression panel component
 */
@Component({
  selector: 'pharos-expression-panel',
  templateUrl: './expression-panel.component.html',
  styleUrls: ['./expression-panel.component.scss']
})
export class ExpressionPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
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
   * shows if component is fully loaded or not
   */
  loaded = false;

  /**
   * display options for the tinx plot
   */
  chartOptions: ScatterOptions;

  /**
   * controls open and closed tree nodes
   */
  treeControl: NestedTreeControl<ExpressionTreeNode> = new NestedTreeControl<ExpressionTreeNode>(node => node.children);

  /**
   * main data source for disease tree
   */
  dataSource: MatTreeNestedDataSource<ExpressionTreeNode> = new MatTreeNestedDataSource<ExpressionTreeNode>();

  /**
   * list of tree nodes to show
   */
  treeData: ExpressionTreeNode[] = [];


  /**
   * tissues to display, currently contains dummy data
   */
  tissues: string[] = [];

  /**
   * radar chart component for differential data
   */
  @ViewChild('radar', { read: RadarChartComponent }) radarComponent: RadarChartComponent;

  /**
   * base homunculus url
   * todo deprecate when tcrd v6 is out
   */
  _URL: string;

  /**
   * target id
   */
  id: string;

  /**
   * map of tissue data to display
   * todo: may become obsolete
   */
  tissueData: Map<string, PharosProperty[]> = new Map<string, PharosProperty[]>();

  /**
   * harmonigram data
   * todo: deprecated
   */
  hgData: any[] = [];

  /**
   * parsed homunculus url
   * todo: deprecated
   */
  imgUrl: string;

  /**
   * list of table dat to display
   * todo: may be deprecated
   */
  tableArr: any[];

  /**
   * radar chart data to display
   */
  radarData: any[] = [];

  /**
   * tissue expression sources
   * todo: will be rewritten like disease sources
   */
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

  /**
   * list of sources for tab display
   */
  sourceList = [];

  /**
   * tab that is selected
   */
  selectedTab: number;

  uberonMap: Map<string, any> = new Map<string, any>();

  sortedExpressions: any[];

  /**
   * attach required services
   * @param pharosApiService
   * @param _route
   * @param navSectionsService
   * @param anatamogramHoverService
   */
  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private navSectionsService: NavSectionsService,
    private anatamogramHoverService: AnatamogramHoverService
  ) {
    super();
  }

  /**
   * subscribe to data changes and generate tree
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        this.targetProps = this.data.targetsProps;
        this.setterFunction();
        this.loading = false;
      });
  }

  /**
   * parse and generate data
   */
  setterFunction() {
    this.targetProps.expressions.forEach(expression => {
      if (expression.uberon && expression.uberon.term) {
        const uberon = expression.uberon.term.uid;
        this.tissues.push(uberon.replace(':' , '_'));
        const uberons = this.uberonMap.get(uberon);
        if (uberons) {
          uberons.push(expression);
          this.uberonMap.set(uberon, uberons);
        } else {
          this.uberonMap.set(uberon, [expression]);
        }
      }
    });

this.sortedExpressions = [...this.uberonMap.values()].sort((a, b) => b.length - a.length);


    this.dataSource.data = this.mapExpressionTree(this.sortedExpressions.slice(0, 10));
    this.loading = false;

    /*    if (this.data.expression) {
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
        }*/

  }

  mapExpressionTree(exprArr: any[]): ExpressionTreeNode[] {
    return exprArr.map(expressions => {
      const expressionSource: ExpressionTreeNode = {
        name: new DataProperty({
          name: expressions[0].uberon.term.name,
          term: expressions[0].uberon.term.name,
          label: expressions[0].uberon.term.uid}),
        children: [
          ...expressions.map(da => da = {name: da.type, children: Object.values(da).filter(prop => prop['name'] !== 'type')})
        ]
      };
      return expressionSource;
    });
  }

  /**
   * map tissue expression data
   */
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

/*  /!**
   * get tissue data by field
   * @param field
   *!/
  getData(field: string): PharosProperty[] {
    return this.tissueData.get(field);
  }

  /!**
   * get count of surces available
   * @param source
   *!/
  getSourceCount(source: string): number {
    return this.tissueData.get(source) ? this.tissueData.get(source).length : 0;
  }

  /!**
   * change tab data
   * @param event
   *!/
  changeHarminogramTabData(event: MatTabChangeEvent) {
    this.hgData = this.tissueData.get(this.sourceList[event.index].label);
    this.imgUrl = this._URL + this.sourceList[event.index].name;
  }*/

  /**
   * set tissue that is hovered from list
   * @param {string} tissue
   */
  setHover(tissue?: any) {
    if (tissue) {
      this.anatamogramHoverService.setTissue(tissue.name.label.replace(':', '_'));
    } else {
      this.anatamogramHoverService.setTissue(null);
    }
  }

  /**
   * draw radar chart on tab change
   * @param change
   */
  drawRadar(change: MatTabChangeEvent) {
    this.selectedTab = change.index;
  }

  /**
   * redraws radar chart when the tab changes, this is due to the lazy loaded tabs
   */
  doneAnimating() {
/*    if (this.selectedTab === 1) {
      this.radarComponent.drawChart();
      this.radarComponent.updateChart();
    }*/
  }

  /**
   * paginate disease list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loading = true;
    this.dataSource.data = this.mapExpressionTree(this.sortedExpressions.slice(event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize));
  this.loading = false;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  /**
   * check to see if a disease tree node has a child node list
   * @param _
   * @param node
   */
  hasChild = (_: number, node: ExpressionTreeNode) => !!node.children && node.children.length > 0;

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
