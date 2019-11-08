import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatTreeNestedDataSource, PageEvent} from '@angular/material';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {PharosProperty} from '../../../../../models/pharos-property';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Target} from '../../../../../models/target';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {DiseaseSerializer} from '../../../../../models/disease';
import {takeUntil} from 'rxjs/operators';

/**
 * interface to track disease tree nodes
 */
interface DiseaseTreeNode {
  /**
   * disease name
   */
  name: PharosProperty;
  /**
   * list of children nodes
   */
  children?: DiseaseTreeNode[];
}

/**
 * component to display disease source data
 */
@Component({
  selector: 'pharos-disease-source',
  templateUrl: './disease-source-panel.component.html',
  styleUrls: ['./disease-source-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiseaseSourceComponent extends DynamicPanelComponent implements OnInit {

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
  treeControl: NestedTreeControl<DiseaseTreeNode> = new NestedTreeControl<DiseaseTreeNode>(node => node.children);

  /**
   * main data source for disease tree
   */
  dataSource: MatTreeNestedDataSource<DiseaseTreeNode> = new MatTreeNestedDataSource<DiseaseTreeNode>();

  /**
   * list of tree nodes to show
   */
  treeData: DiseaseTreeNode[] = [];

  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private navSectionsService: NavSectionsService
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
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
          this.target = this.data.targets;
           this.targetProps = this.data.targetsProps;
          this.setterFunction();
          this.loading = false;
      });
  }

  /**
   * parse data
   * creates map to reduce duplicate disease names, and adds sources to disease name
   */
  setterFunction(): void {
    this.dataSource.data = this.targetProps.diseases.map(disease => {
      const diseaseSource: DiseaseTreeNode = {
        name: disease.name,
        children: [
          ...disease.associations.map(da => da = {name: da.type, children: Object.values(da).filter(prop => prop['name'] !== 'type')})
        ]
      };
      return diseaseSource;
    });

    if (this.target.tinx && this.target.tinx.importances) {
      this.tinx = [];
      this.target.tinx.importances.map(point => {
        if (point.dname) {
          const p: PharosPoint = new PharosPoint({
            label: point.doid,
            x: point.dnovelty,
            y: point.imp,
            name: point.dname
          });
          this.tinx.push(p);
        }
      });
    }

       this.chartOptions = new ScatterOptions({
           line: false,
         xAxisScale: 'log',
         yAxisScale: 'log',
         xLabel: 'Novelty',
         yLabel: 'Importance',
          margin: {top: 20, right: 45, bottom: 25, left: 35}
       });
       this.loading = false;
    // }
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  /**
   * paginate disease list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loading = true;
    const diseaseSerializer = new DiseaseSerializer();
    const pageParams = {
      diseasetop: event.pageSize,
      diseaseskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.fetchMore(this._route.snapshot.data.path, pageParams).valueChanges.subscribe(res => {
      console.log(res);
      this.target.diseases = res.data.targets.diseases;
      this.targetProps.diseases = res.data.targets.diseases.map(disease => diseaseSerializer._asProperties(disease));
      this.setterFunction();
    });
  }


  /**
   * check to see if a disease tree node has a child node list
   * @param _
   * @param node
   */
  hasChild = (_: number, node: DiseaseTreeNode) => !!node.children && node.children.length > 0;

}

