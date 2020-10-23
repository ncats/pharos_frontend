import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {Target} from "../../../../../models/target";
import {takeUntil} from "rxjs/operators";
import {PageData} from "../../../../../models/page-data";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Facet} from "../../../../../models/facet";
import {PharosProperty} from "../../../../../models/pharos-property";
import {Pathway, PathwaySerializer} from "../../../../../models/pathway";
import {PharosApiService} from "../../../../../pharos-services/pharos-api.service";
import {TargetComponents} from "../../../../../models/target-components";
import {ActivatedRoute} from "@angular/router";

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
  Facet = Facet;
  reactomeData: any;
  reactomePageData: PageData;
  reactomeListParams = new PathwayListParams(false);
  selectedStructure: Pathway;

  otherData: any;
  otherPageData: PageData;
  otherListParams = new PathwayListParams(true);

  /**
   * list of fields to display. The labels are adapted
   * @type {PharosProperty[]}
   */
  reactomeFields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Name',
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

  otherFields: PharosProperty[] = [
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

  constructor(
    private navSectionsService: NavSectionsService,
    public breakpointObserver: BreakpointObserver,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    private _route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 960px)');
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;

        if (this.target.reactomePathways || this.target.otherPathways) {
          if (this.target.reactomePathways.length === 0 && this.target.otherPathways.length === 0) {
            this.navSectionsService.hideSection(this.field);
          }
          else{
            this.navSectionsService.showSection(this.field);
          }
        }

        this.reactomeData = this.data.targetsProps.reactomePathways;
        if(this.target.reactomePathways && this.target.reactomePathways.length > 0) {
          this.selectedStructure = this.target.reactomePathways[0];
        }
        this.reactomePageData = new PageData({total: this.target.reactomePathwayCount, skip:5, top:0});
        this.otherData = this.data.targetsProps.otherPathways;
        this.otherPageData = new PageData({total: this.target.otherPathwayCount, skip:5, top:0});
        this.loading = false;
      });
  }

  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  changePage(event: any, listParams: PathwayListParams){
    this.loading = true;
    const pathwaySerializer = new PathwaySerializer();
    let pageParams: any = {};
    this[listParams.pageDataName].skip = event.pageIndex * event.pageSize;
    pageParams[listParams.topParam] = event.pageSize;
    pageParams[listParams.skipParam] = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, listParams.componentName).subscribe(res => {
      this.target[listParams.targetFieldName] = res.data.targets[listParams.targetFieldName].map(path => pathwaySerializer.fromJson(path));
      this[listParams.panelFieldName] = res.data.targets[listParams.targetFieldName].map(path => pathwaySerializer._asProperties(path));
      this.loading = false;
      this.changeRef.markForCheck();
    });
  }

  changePath(event: any){
    if (this.selectedStructure?.sourceID !== event.sourceID.term) {
      this.selectedStructure = this.target.reactomePathways.find(path => {
        return path.sourceID === event.sourceID.term
      });
      this.changeRef.markForCheck();
    }
  }
}

export class PathwayListParams{
  pageDataName = "reactomePageData";
  topParam = 'reactomepathwaystop';
  skipParam = 'reactomepathwaysskip';
  componentName = TargetComponents.Component.ReactomePathways;
  targetFieldName = 'reactomePathways';
  panelFieldName = "reactomeData";

  constructor(isOther: boolean = true) {
    if(isOther){
      this.pageDataName = "otherPageData";
      this.topParam = 'nonreactomepathwaystop';
      this.skipParam = 'nonreactomepathwaysskip';
      this.componentName = TargetComponents.Component.NonReactomePathways;
      this.targetFieldName = 'otherPathways';
      this.panelFieldName = "otherData";
    }
  }
}
