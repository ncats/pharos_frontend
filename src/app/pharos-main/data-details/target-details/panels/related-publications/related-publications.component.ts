import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Target} from '../../../../../models/target';
import {PageData} from '../../../../../models/page-data';
import {PharosProperty} from '../../../../../models/pharos-property';
import {Publication, PublicationSerializer} from '../../../../../models/publication';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {PageEvent} from '@angular/material/paginator';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Generif, GenerifSerializer} from '../../../../../models/generif';
import {ScatterPlotComponent} from '../../../../../tools/visualizations/scatter-plot/scatter-plot.component';
import {takeUntil} from 'rxjs/operators';
import {TargetComponents} from '../../../../../models/target-components';
import {isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-related-publications',
  templateUrl: './related-publications.component.html',
  styleUrls: ['./related-publications.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedPublicationsComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  /**
   * @param _route
   * @param changeRef
   * @param pharosApiService
   * @param pharosConfig
   */
  constructor(private _route: ActivatedRoute,
              private changeRef: ChangeDetectorRef,
              private pharosApiService: PharosApiService,
              private pharosConfig: PharosConfig,
              @Inject(PLATFORM_ID) private platformID: any,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }
  /**
   * radar chart component for differential data
   */
  @ViewChildren(ScatterPlotComponent) scatterComponents: QueryList<ScatterPlotComponent>;

  /**
   * parent target
   */
  @Input() target: Target;

  activeTab = 0;

  targetProps: any;
  /**
   * data array
   */
  publications: Publication[];

  /**
   * data array
   */
  generifs: Generif[];

  /**
   * pagination data
   */
  publicationsPageData: PageData;

  /**
   * pagination data
   */
  rifPageData: PageData;

  publicationsSerializer: PublicationSerializer;
  generifsSerializer: GenerifSerializer;

  /**
   * publication table fields to display
   */
  publicationTableFields: PharosProperty[] = [
    new PharosProperty({
      name: 'pmid',
      label: 'PMID',
      width: 15
    }),
    new PharosProperty({
      name: 'year',
      label: 'Year',
      sortable: true,
      width: 8
    }),
    new PharosProperty({
      name: 'title',
      label: 'Title',
      width: 70
    })
  ];

  /**
   * generif table fields to display
   */
  rifTableFields: PharosProperty[] = [
    new PharosProperty({
      name: 'pubPmids',
      label: 'PMID',
      width: 15
    }),
    new PharosProperty({
      name: 'text',
      label: 'Text',
      width: 80
    })
  ];

  tabChanged(event) {
    if (this.activeTab !== event.index) {
      this.activeTab = event.index;
      this.dynamicServices.navSectionsService.setActiveTab('relatedPublications', event.tab.textLabel);
    }
  }

  /**
   * parse data as publication objects
   * set pagination objects
   * create timelines if data is available
   */
  ngOnInit() {
    this.publicationsSerializer = new PublicationSerializer();
    this.generifsSerializer = new GenerifSerializer();
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.loadingStart();
        this.activeTab = this._route.snapshot.fragment === 'geneRIFs' ? 1 : 0;
        this.dynamicServices.navSectionsService.activeTab$
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(newTab => {
          if (!this.loading) {
            this.dynamicServices.location.replaceState(`${this.dynamicServices.location.path(false)}#${newTab}`);
            this.dynamicServices.viewportScroller.scrollToAnchor(newTab);
            this.activeTab = newTab === 'geneRIFs' ? 1 : newTab === 'relatedPublications' ? 0 : this.activeTab;
            this.changeRef.markForCheck();
          }
        });
        this.target = this.data.targets;
        this.targetProps = this.data.targetsProps;

        if (this.hasData()) {
          this.showSection();
        } else {
          this.hideSection();
        }
        if (isPlatformBrowser(this.platformID)) {

          if (this.target?.publications) {
            this.publications = this.targetProps.publications;
            this.publicationsPageData = this.makePageData(this.target.publicationCount);
          }

          if (this.target?.generifs) {
            this.generifs = this.targetProps.generifs;
            this.rifPageData = this.makePageData(this.target.generifCount);
          }

          this.loadingComplete();
          this.changeRef.markForCheck();
        }
      });
  }

  /**
   * paginate any of the publication tables (generif or publication)
   * @param event
   * @param origin
   */
  paginate(event: PageEvent, origin: string) {
    this.loadingStart();
    const pageParams = {
      [`${origin}top`]: event.pageSize,
      [`${origin}skip`]: event.pageIndex * event.pageSize,
    };
    let pageData = this.publicationsPageData;
    let component = TargetComponents.Component.Publications;
    if (origin === 'generifs') {
      pageData = this.rifPageData;
      component = TargetComponents.Component.Generifs;
    }
    pageData.top = event.pageSize;
    pageData.skip = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, component)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
      this[origin] = res.data.targets[origin]
        .map(pub => this[`${origin}Serializer`].fromJson(pub))
        .map(pubObj => this[`${origin}Serializer`]._asProperties(pubObj));
      this.loadingComplete(false);
      this.changeRef.markForCheck();
    });
  }

  hasData() {
    return this.target?.publicationCount > 0 || this.target?.generifCount > 0;
  }
}
