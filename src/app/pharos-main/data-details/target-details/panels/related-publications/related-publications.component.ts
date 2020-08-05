import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input,
  OnDestroy,
  OnInit, PLATFORM_ID,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Target} from '../../../../../models/target';
import {PageData} from '../../../../../models/page-data';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
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
import {TargetComponents} from "../../../../../models/target-components";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'pharos-related-publications',
  templateUrl: './related-publications.component.html',
  styleUrls: ['./related-publications.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedPublicationsComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {
  /**
   * radar chart component for differential data
   */
  @ViewChildren(ScatterPlotComponent) scatterComponents: QueryList<ScatterPlotComponent>;

  /**
   * parent target
   */
  @Input() target: Target;

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

  /**
   * serializer for publications
   */
  publicationsSerializer: PublicationSerializer = new PublicationSerializer();

  /**
   * serializer for generifs
   */
  generifsSerializer: GenerifSerializer = new GenerifSerializer();

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

  /**
   *
   * @param navSectionsService
   * @param _route
   * @param changeRef
   * @param pharosApiService
   * @param pharosConfig
   */
  constructor(private navSectionsService: NavSectionsService,
              private _route: ActivatedRoute,
              private changeRef: ChangeDetectorRef,
              private pharosApiService: PharosApiService,
              private pharosConfig: PharosConfig,
              @Inject(PLATFORM_ID) private platformID: Object) {
    super();
  }

  /**
   * parse data as publication objects
   * set pagination objects
   * create timelines if data is available
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

          if (this.target.publications) {
            this.publications = this.targetProps.publications;
            this.publicationsPageData = this.makePageData(this.target.publicationCount);
          }

          if (this.target.generifs) {
            this.generifs = this.targetProps.generifs;
            this.rifPageData = this.makePageData(this.target.generifCount);
          }

          this.loading = false;
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
    this.loading = true;
    const pageParams = {
      [`${origin}top`]: event.pageSize,
      [`${origin}skip`]: event.pageIndex * event.pageSize,
    };
    var pageData = this.publicationsPageData;
    var component = TargetComponents.Component.Publications;
    if (origin == 'generifs') {
      pageData = this.rifPageData;
      component = TargetComponents.Component.Generifs;
    }
    pageData.top = event.pageSize;
    pageData.skip = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, component).subscribe(res => {
      this[origin] = res.data.targets[origin]
        .map(pub => this[`${origin}Serializer`].fromJson(pub))
        .map(pubObj => this[`${origin}Serializer`]._asProperties(pubObj));
      this.loading = false;
      this.changeRef.markForCheck();
    });
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  getTooltip(label: string): string {
    const tooltip = this.apiSources.filter(source => source.field === label);
    if (tooltip.length) {
      return tooltip[0].description;
    } else {
      return null;
    }
  }


  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
