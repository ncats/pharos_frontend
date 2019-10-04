import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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

/**
 * displays publication information and statistics about a target
 */
@Component({
  selector: 'pharos-publication-info-panel',
  templateUrl: './publication-info-panel.component.html',
  styleUrls: ['./publication-info-panel.component.scss']
})
export class PublicationInfoPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {
  /**
   * parent target
   */
  @Input() target: Target;

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
   * @param pharosConfig
   */
  constructor(private navSectionsService: NavSectionsService,
              private _http: HttpClient,
              private pharosConfig: PharosConfig) {
    super();
  }

  /**
   * subscribe to data changes
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
        }
      });
  }

  /**
   * parse data as publication objects
   * set pagination objects
   * create timelines if data is available
   */
  setterFunction() {
    if (this.data.publications) {
      const publications: Publication[] = this.data.publications
        .filter(publication => publication)
        .map(publication => this.publicationSerializer.fromJson(publication));
      this.publications = publications
        .map(publication => publication = this.publicationSerializer._asProperties(publication));
      this.publicationsPageData = this.makePageData(this.target._publications.count);
    }

    if (this.data.generifs) {
      const rifs: Publication[] = this.data.generifs
        .map(publication => this.publicationSerializer.fromJson(publication));

      this.generifs = rifs
        .map(publication => publication = this.publicationSerializer._asProperties(publication));

      this.rifPageData = this.makePageData(this.data.generifCount);
    }
    if (this.data.pmscore) {
      const tempArr: PharosPoint[] = [];
      this.data.pmscore.map(point => {
        const pt: PharosPoint = new PharosPoint({x: +point.year, y: point.score});
        tempArr.push(pt);
      });
      this.pmscoreTimeline = tempArr;
    }
    if (this.data.patents) {
      const tempArr: PharosPoint[] = [];
      this.data.patents.map(point => {
        const pt: PharosPoint = new PharosPoint({x: +point.year, y: +point.count});
        tempArr.push(pt);
      });
      this.patentTimeline = tempArr;
    }
    if (this.data.pubtator) {
      const tempArr: PharosPoint[] = [];
      this.data.pubtator.map(point => {
        const pt: PharosPoint = new PharosPoint({x: +point.year, y: point.score});
        tempArr.push(pt);
      });
      this.pubtatorTimeline = tempArr;
    }

    this.loading = false;
  }

  /**
   * paginate any of the publication tables (generif or publication)
   * @param $event
   * @param origin
   */
  paginate($event, origin: string) {
    const url = `${this.pharosConfig.getApiPath()}targets/${this.target.accession}/${origin}?skip=${$event.pageIndex * $event.pageSize}&top=${$event.pageSize}`;
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
      });
  }

  /**
   * math function to convert pubtator score
   */
  raisePubtator() {
    if (this.target) {
      return Math.pow(10, this.target.pubTatorScore).toFixed(2);
    }
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
