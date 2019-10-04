import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DiseaseRelevance, DiseaseRelevanceSerializer} from '../../../../../models/disease-relevance';
import {MatPaginator, MatTabChangeEvent, MatTreeNestedDataSource, PageEvent} from '@angular/material';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {PharosProperty} from '../../../../../models/pharos-property';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {NestedTreeControl} from '@angular/cdk/tree';

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
   * Paginator object from Angular Material
   * */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
   * maps disease sources
   */
  newdiseasemap: Map<string, any> = new Map<string, any>();
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
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
          this.loading = false;
        }
      });
  }

  /**
   * parse data
   * creates map to reduce duplicate disease names, and adds sources to disease name
   */
  setterFunction(): void {
    this.data.diseases.forEach(disease => {
      const dobj: PharosProperty = new PharosProperty(disease.properties.filter(prop => prop.label === 'IDG Disease')[0]);
      dobj.internalLink = ['/diseases', dobj.term as string];
      const dname: string = dobj.term as string; // todo: ignore case would be cool
      const dlist = this.newdiseasemap.get(dname);
      let diseaseSource: DiseaseTreeNode = {
        name: new PharosProperty(disease.properties.filter(prop => prop.label === 'Data Source')[0]),
        children: [
          ...disease.properties
            .filter(prop => prop.label !== 'Data Source' && prop.label !== 'IDG Disease' )
            .map(prop => new PharosProperty(prop))
        ]
      };

      if (diseaseSource.children.length === 0) {
        diseaseSource = {name: diseaseSource.name};
      }
      if (dlist) {
        dlist.children.push(diseaseSource);
        this.newdiseasemap.set(dname, dlist);
      } else {
        this.newdiseasemap.set(dname, {name: dobj, children: [diseaseSource]});
      }
    });
    const sortedDiseases = Array.from(this.newdiseasemap.entries()).sort((a, b) => {
      if (a[1].children.length < b[1].children.length) {
        return 1;
      }
      if (a[1].children.length > b[1].children.length) {
        return -1;
      }
      return 0;
    });
    this.treeData = Array.from(new Map(sortedDiseases).values());
    this.dataSource.data = this.treeData.slice(0, 10);
      this.loaded = true;

    if (this.data.tinx && this.data.tinx.importances) {
      this.tinx = [];
       this.data.tinx.importances.map(point => {
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

       this.chartOptions = new ScatterOptions({
           line: false,
         xAxisScale: 'log',
         yAxisScale: 'log',
         xLabel: 'Novelty',
         yLabel: 'Importance',
          margin: {top: 20, right: 45, bottom: 25, left: 35}
       });
    }
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
    this.dataSource.data = this.treeData.slice((event.pageIndex * event.pageSize), ((event.pageIndex + 1) * event.pageSize));
  }


  /**
   * check to see if a disease tree node has a child node list
   * @param _
   * @param node
   */
  hasChild = (_: number, node: DiseaseTreeNode) => !!node.children && node.children.length > 0;

}

