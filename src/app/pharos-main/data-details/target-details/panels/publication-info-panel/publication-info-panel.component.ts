import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Target} from '../../../../../models/target';
import {PageData} from '../../../../../models/page-data';
import {HttpClient} from '@angular/common/http';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {PharosProperty} from '../../../../../models/pharos-property';
import {Publication, PublicationSerializer} from '../../../../../models/publication';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PharosPoint} from '../../../../../models/pharos-point';
import {ScatterOptions} from '../../../../../tools/visualizations/scatter-plot/models/scatter-options';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {DiseaseSerializer} from '../../../../../models/disease';
import {PageEvent} from '@angular/material';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';

/**
 * displays publication information and statistics about a target
 */
@Component({
  selector: 'pharos-publication-info-panel',
  templateUrl: './publication-info-panel.component.html',
  styleUrls: ['./publication-info-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationInfoPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {
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
   */node;
  generifs: Publication[];

  /**
   * pagination data
   */
  publicationsPageData: PageData;

  /**
   * pgaination data
   */
  rifPageData: PageData;

  /**
   * timeline data array
   */
  pmscoreTimeline: PharosPoint[];

  /**
   * timeline data array
   */
  pubtatorTimeline: PharosPoint[];

  /**
   * timeline data array
   */
  patentTimeline: PharosPoint[];

  /**
   * serializer for publications
   */
  publicationSerializer: PublicationSerializer = new PublicationSerializer();

  /**
   * publication table fields to display
   */
  publicationTableFields: PharosProperty[] = [
    new PharosProperty({
      name: 'pmid',
      label: 'PMID',
      width: 10
    }),
    new PharosProperty({
      name: 'year',
      label: 'Year',
      sortable: true
    }),
    new PharosProperty({
      name: 'title',
      label: 'title'
    })
  ];

  /**
   * generif table fields to display
   */
  rifTableFields: PharosProperty[] = [
    new PharosProperty({
      name: 'pmid',
      label: 'PMID',
      width: 10
    }),
    new PharosProperty({
      name: 'text',
      label: 'Text',
      width: 80
    })
  ];

  /**
   * chart configuration options
   */
  chartOptions: ScatterOptions = new ScatterOptions({
    line: true,
    xAxisScale: 'year',
    xLabel: 'Year',
    yAxisScale: 'linear',
    yLabel: 'Score',
    margin: {top: 20, right: 35, bottom: 25, left: 35}
  });

  /**
   *
   * @param navSectionsService
   * @param _http
   * @param changeRef
   * @param pharosApiService
   * @param pharosConfig
   */
  constructor(private navSectionsService: NavSectionsService,
              private _route: ActivatedRoute,
              private changeRef: ChangeDetectorRef,
              private pharosApiService: PharosApiService,
              private pharosConfig: PharosConfig) {
    super();
  }

  /**
   * subscribe to data changes
   */
  ngOnInit() {
    console.log(this);
          this.target = this.data.targets;
          this.targetProps = this.data.targetsProps;
         this.publicationsPageData = this.makePageData(this.target.publicationCount);
        this.setterFunction();
  }

  /**
   * parse data as publication objects
   * set pagination objects
   * create timelines if data is available
   */
  setterFunction() {
    if (this.target.publications) {
      this.publications = this.targetProps.publications;
    }

    if (this.data.generifs) {
      const rifs: Publication[] = this.data.generifs
        .map(publication => this.publicationSerializer.fromJson(publication));

      this.generifs = rifs
        .map(publication => publication = this.publicationSerializer._asProperties(publication));

      this.rifPageData = this.makePageData(this.data.generifCount);
    }

    if (this.target.pubmedScores) {
      this.pmscoreTimeline = this.target.pubmedScores.map(point =>  new PharosPoint({x: +point.year, y: point.score}));
    }

    if (this.target.pubTatorScores) {
      this.pubtatorTimeline = this.target.pubTatorScores.map(point => new PharosPoint({x: +point.year, y: +point.score}));
    }

    if (this.target.patentCounts) {
      this.patentTimeline = this.target.patentCounts.map(point => new PharosPoint({x: +point.year, y: point.count}));
    }

    this.loading = false;
    this.changeRef.detectChanges();
  }

  /**
   * paginate any of the publication tables (generif or publication)
   * @param event
   * @param origin
   */
  paginate(event: PageEvent, origin: string) {
    console.log(event);
    console.log(origin);
    this.loading = true;
    const pageParams = {
      [`${origin}top`]: event.pageSize,
      [`${origin}skip`]: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.fetchMore(this._route.snapshot.data.path, pageParams).valueChanges.subscribe(res => {
     console.log(res);
       // this.target[origin] = res.data.targets[origin];
      this[origin] = res.data.targets[origin].map(pub => this.publicationSerializer._asProperties(pub));
     // this.setterFunction();
      console.log(this);
      this.loading = false;
      this.changeRef.markForCheck();
    });

    /* const url = `${this.pharosConfig.getApiPath()}targets/${this.target.accession}/${origin}?skip=${$event.pageIndex * $event.pageSize}&top=${$event.pageSize}`;
   // this.loading = true;
    this._http.get<Publication[]>(url)
      .subscribe(res => {
        const pubs = res.filter(pub => pub).map(pub => this.publicationSerializer.fromJson(pub));
        this[origin] = pubs.map(pub => pub = this.publicationSerializer._asProperties(pub));
       this.loading = false;
        if (origin === 'publications') {
          this.publicationsPageData.skip = $event.pageIndex * $event.pageSize;
        }
        if (origin === 'generifs') {
          this.rifPageData.skip = $event.pageIndex * $event.pageSize;
        }
      });*/
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  getTooltip(label: string): string {
    return this.apiSources.filter(source => source.field === label)[0].description;
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
