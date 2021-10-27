import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {skip, takeUntil} from 'rxjs/operators';
import {PageData} from '../../../../../models/page-data';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Facet} from '../../../../../models/facet';
import {PharosProperty} from '../../../../../models/pharos-property';
import {Pathway, PathwaySerializer} from '../../../../../models/pathway';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {TargetComponents} from '../../../../../models/target-components';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-pathways-panel',
  templateUrl: './pathways-panel.component.html',
  styleUrls: ['./pathways-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PathwaysPanelComponent extends DynamicPanelComponent implements OnInit {
  /**
   * parent target
   */
  @Input() target: Target;
  @Input() targetsProps: any;

  pageDataMap: Map<string, PageData> = new Map<string, PageData>();
  facetDataMap: Map<string, {facet: string, friendlyName: string}> = new Map<string, {facet: string, friendlyName: string}>([
      ['Reactome', {facet: 'Reactome Pathway', friendlyName: 'Reactome Pathways'}],
      ['KEGG', {facet: 'KEGG Pathway', friendlyName: 'KEGG Pathways'}],
      ['WikiPathways', {facet: 'WikiPathways Pathway', friendlyName: 'WikiPathways Pathways'}],
      ['UniProt', {facet: 'UniProt Pathway', friendlyName: 'UniProt Pathways'}],
      ['PathwayCommons', {facet: 'PathwayCommons Pathway', friendlyName: 'PathwayCommons Pathways'}]]);

  pathOrder: string[];

  Facet = Facet;
  selectedStructure: Pathway;

  pathwayFields: PharosProperty[] = [
    new PharosProperty({
      name: 'type',
      label: 'Data Source',
      width: '15vw'
    }),
    new PharosProperty({
      name: 'name',
      label: 'Name'
    }),
    new PharosProperty({
      name: 'facetLink',
      label: 'Explore in Pharos',
      width: '15vw'
    }),
    new PharosProperty({
      name: 'sourceID',
      label: 'Explore in Source',
      width: '20vw'
    })
  ];

  shortPathwayFields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Name'
    }),
    new PharosProperty({
      name: 'facetLink',
      label: 'Explore in Pharos',
      width: '15vw'
    }),
    new PharosProperty({
      name: 'sourceID',
      label: 'Explore in Source',
      width: '20vw'
    })
  ];

  constructor(
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        this.targetsProps = this.data.targetsProps;
        this.pathOrder = [];

        this.target.pathwayCounts?.forEach(countObj => {
          const pwType = countObj.name.split(':')[0];
          if (!this.pathOrder.includes(pwType)){
            this.pathOrder.push(pwType);
          }
          this.pageDataMap.set(pwType, new PageData({top: 5, skip: 0, total: this.getPathwayCount(pwType)}));
        });

        if (this.pathOrder.includes('Reactome')){
          this.selectedStructure = this.target.pathwayMap.get('Reactome')[0];
        }
        this.pathOrder.sort((a, b) => {
          if (a === 'Reactome'){
            return -1;
          }
          if (b === 'Reactome'){
            return 1;
          }
          return a.localeCompare(b);
        });

        if (this.target.pathways && this.target.pathways.length > 0) {
          this.showSection();
        } else {
          this.hideSection();
        }
        this.loadingComplete();
      });
  }

  getTotalPathwayCount() {
    return this.target.pathwayCounts.reduce((prev, cur) => prev + cur.value, 0);
  }

  getPathwayCount(pwType: string) {
    return this.target.pathwayCounts.filter(countObj => {
      return countObj.name.includes(pwType);
    }).reduce((prev, cur) => prev + cur.value, 0);
  }

  changePage(event: any, pwType: string) {
    this.loadingStart();
    const pageParams: any = {};

    pageParams.pathwaystop = event.pageSize;
    pageParams.pathwaysskip = event.pageIndex * event.pageSize;
    pageParams.pwtype = pwType;

    const pageData = this.pageDataMap.get(pwType);
    pageData.top = event.pageSize;
    pageData.skip = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, TargetComponents.Component.PathwayPage)
      .subscribe({
      next: res => {
        const pathwaySerializer = new PathwaySerializer();
        this.target.pathwayMap.set(pwType, res.data.targets.pathways.map(path => pathwaySerializer.fromJson(path)));
        this.targetsProps.pathwayMap.set(pwType, res.data.targets.pathways.map(path => pathwaySerializer._asProperties(path)));
        this.loadingComplete();
        this.changeRef.markForCheck();
      }, error: err => {
        err;
      }
    });
  }

  changePath(event: any, pwType: string) {
    if (pwType !== 'Reactome'){
      return;
    }
    if (this.selectedStructure?.sourceID !== event.sourceID.term) {
      this.selectedStructure = this.target.pathwayMap.get('Reactome').find(path => {
        return path.sourceID === event.sourceID.term;
      });
      this.changeRef.markForCheck();
    }
  }
}

export class PathwayListParams {
  topParam = 'pathwaystop';
  skipParam = 'pathwaysskip';
  pwType: string;

  constructor(pwType: string = 'Reactome') {
    this.pwType = pwType;
  }
}
