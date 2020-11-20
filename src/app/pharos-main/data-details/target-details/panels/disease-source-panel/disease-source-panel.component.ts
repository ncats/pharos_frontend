import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTreeNestedDataSource} from '@angular/material/tree';
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
import {DataProperty} from '../../../../../tools/generic-table/components/property-display/data-property';
import {TargetComponents} from "../../../../../models/target-components";
import {isPlatformBrowser} from "@angular/common";

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
export class DiseaseSourceComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

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
   * controls open and closed tree nodes
   */
  treeControl: NestedTreeControl<DiseaseTreeNode> = new NestedTreeControl<DiseaseTreeNode>(node => node.children);

  /**
   * main data source for disease tree
   */
  dataSource: MatTreeNestedDataSource<DiseaseTreeNode> = new MatTreeNestedDataSource<DiseaseTreeNode>();

  hasData() {
    return this.target && ((this.target.diseaseCount > 0) || (this.tinx && this.tinx.length > 0));
  }

  /**
   * list of tree nodes to show
   */
  treeData: DiseaseTreeNode[] = [];

  /**
   * display options for the tinx plot
   */
  chartOptions: ScatterOptions = new ScatterOptions({
    line: false,
    xAxisScale: 'log',
    yAxisScale: 'log',
    xLabel: 'Novelty',
    yLabel: 'Importance',
    margin: {top: 20, right: 175, bottom: 25, left: 35}
  });

  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: Object,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
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
        if (isPlatformBrowser(this.platformID)) {
          this.target = this.data.targets;
          this.targetProps = this.data.targetsProps;

          if (this.target.diseaseCount > 0 || (this.target.tinx && this.target.tinx.length > 0)) {
            this.navSectionsService.showSection(this.field);
          } else {
            this.navSectionsService.hideSection(this.field);
          }

          if (this.target.tinx) {
            this.tinx = [];
            this.target.tinx.map(point => {
              if (point.disease) {
                const p: PharosPoint = new PharosPoint({
                  label: point.disease.doid,
                  x: point.novelty,
                  y: point.score,
                  name: point.disease.name
                });
                this.tinx.push(p);
              }
            });
          }
          this.setterFunction();
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
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
          ...disease.associations.map(da => da = {
            name: da.type,
            children: Object.values(da as DataProperty[]).filter(prop => prop.name !== 'type')
          })
        ]
      };
      return diseaseSource;
    });
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
    this.loadingStart();
    const diseaseSerializer = new DiseaseSerializer();
    const pageParams = {
      diseasetop: event.pageSize,
      diseaseskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, TargetComponents.Component.DiseaseSources)
      .subscribe(
        res => {
          this.target.diseases = res.data.targets.diseases;
          this.targetProps.diseases = res.data.targets.diseases.map(disease => diseaseSerializer._asProperties(disease));
          this.setterFunction();
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
      );
  }

  /**
   * check to see if a disease tree node has a child node list
   * @param _
   * @param node
   */
  hasChild = (_: number, node: DiseaseTreeNode) => !!node.children && node.children.length > 0;

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

