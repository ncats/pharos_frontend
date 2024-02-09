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
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {ScatterPlotComponent} from '../../../../../tools/visualizations/scatter-plot/scatter-plot.component';
import {takeUntil} from 'rxjs/operators';
import {TargetComponents} from '../../../../../models/target-components';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {
  FieldSelectionDialogComponent
} from '../../../../../tools/field-selection-dialog/field-selection-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {MatIcon} from '@angular/material/icon';
import {PublicationCardComponent} from './publication-card/publication-card.component';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {TargetWordCloudComponent} from '../target-word-cloud/target-word-cloud.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, FlexLayoutModule, MatCardModule, ComponentHeaderComponent, MatIcon,
    MatPaginator, PublicationCardComponent, ScrollspyDirective, TargetWordCloudComponent, MatButtonModule],
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
   */
  constructor(
              private dialog: MatDialog,
              private _route: ActivatedRoute,
              private changeRef: ChangeDetectorRef,
              private pharosApiService: PharosApiService,
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
   * pagination data
   */
  publicationsPageData: PageData;

  publicationsSerializer: PublicationSerializer;

  /**
   * publication table fields to display
   */
  publicationTableFields: PharosProperty[] = [
    new PharosProperty({
      name: 'pmid',
      label: 'PMID',
      width: '10vw'
    }),
    new PharosProperty({
      name: 'title',
      label: 'Title'
    }),
    new PharosProperty({
      name: 'journal',
      label: 'Journal'
    }),
    new PharosProperty({
      name: 'date',
      label: 'Date',
      sortable: true,
      width: '10vw'
    }),
    new PharosProperty({
      name: 'authors',
      label: 'Authors'
    }),
    new PharosProperty({
      name: 'fetch_date',
      label: 'Fetch Date'
    })
  ];

  /**
   * parse data as publication objects
   * set pagination objects
   * create timelines if data is available
   */
  ngOnInit() {
    this.publicationsSerializer = new PublicationSerializer();
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
            this.publications = this.target.publications;
            this.publicationsPageData = this.makePageData(this.target.publicationCount);
            this.publicationsPageData.top = 5;
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
    const pageData = this.publicationsPageData;
    const component = TargetComponents.Component.Publications;
    pageData.top = event.pageSize;
    pageData.skip = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, component)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        const results = JSON.parse(JSON.stringify(res));
        this[origin] = results.data.targets[origin].map(pub => this[`${origin}Serializer`].fromJson(pub));
        this.loadingComplete(false);
        this.changeRef.markForCheck();
    });
  }

  hasData() {
    return this.target?.publicationCount > 0 || this.target?.generifCount > 0;
  }

  get dataVersions() {
    return this.target?.dataVersions?.filter(f => ['JensenLab textmining mentions', 'NCBI'].includes(f.key));
  }

  downloadData(subset) {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: 1, model: 'Target', route: this._route, batch: this.target.preferredSymbol, defaultSubset: subset},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
