import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
import {PharosConfig} from "../../../../../../config/pharos-config";


@Component({
  selector: 'pharos-publication-info-panel',
  templateUrl: './publication-info-panel.component.html',
  styleUrls: ['./publication-info-panel.component.scss']
})
export class PublicationInfoPanelComponent extends DynamicTablePanelComponent implements OnInit {
  @Input() target: Target;
  publications: Publication[];
  generifs: Publication[];
  publicationPageData: PageData;
  rifPageData: PageData;
  pmscoreTimeline: PharosPoint[];
  pubtatorTimeline: PharosPoint[];
  patentTimeline: PharosPoint[];
  publicationSerializer: PublicationSerializer = new PublicationSerializer();

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

chartOptions: ScatterOptions = new ScatterOptions({
    line: true,
    xAxisScale: 'year',
    xLabel: 'Year',
    yAxisScale: 'linear',
    yLabel: 'Score',
    margin: {top: 20, right: 35, bottom: 25, left: 35}
  });

  constructor(
    private navSectionsService: NavSectionsService,
    private _http: HttpClient,
    private ref: ChangeDetectorRef,
    private pharosConfig: PharosConfig
  ) {
    super();
  }

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

  setterFunction() {
    const publications: Publication[] = this.data.publications.filter(publication => publication).map(publication => this.publicationSerializer.fromJson(publication));
    const rifs: Publication[] = this.data.generifs.map(publication => this.publicationSerializer.fromJson(publication));
    this.publications = publications.map(publication => publication = this.publicationSerializer._asProperties(publication));
    this.generifs = rifs.map(publication => publication = this.publicationSerializer._asProperties(publication));
    this.publicationPageData = this.makePageData(this.target._publications.count);
    this.rifPageData = this.makePageData(this.data.generifCount);
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

  paginate($event, origin: string) {
    const url = `${this.pharosConfig.getApiPath()}targets/${this.target.accession}/${origin}?skip=${($event.pageIndex) * $event.pageSize}&top=${$event.pageSize}`;
    this.loading = true;
    this._http.get<Publication[]>(
      url)
      .subscribe(res => {
        const pubs: Publication[] = res.map(pub => this.publicationSerializer.fromJson(pub));
        this[origin] = pubs.map(pub => pub = this.publicationSerializer._asProperties(pub));
        this.loading = false;
      });
  }

  raisePubtator() {
    if (this.target) {
      return Math.pow(10, this.target.pubTatorScore).toFixed(2);
    }
  }

  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }



}
