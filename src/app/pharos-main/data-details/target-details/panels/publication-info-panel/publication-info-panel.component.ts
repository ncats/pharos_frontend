import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {from} from "rxjs/index";
import {takeUntil, zipAll} from "rxjs/operators";
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../models/target";
import {PageData} from "../../../../../models/page-data";
import {HttpClient} from "@angular/common/http";
import {PharosPoint} from "../../../../../tools/visualizations/line-chart/line-chart.component";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {PharosProperty} from "../../../../../models/pharos-property";
import {Publication, PublicationSerializer} from "../../../../../models/publication";
import {DynamicTablePanelComponent} from "../../../../../tools/dynamic-table-panel/dynamic-table-panel.component";

/*
const TABLEMAP: Map<string, PharosProperty> = new Map<string, PharosProperty>(
  [
    ['Year',  new PharosProperty({
      name: 'year',
      label: 'Year',
      sortable: true
    })
    ], [
    'PMID', new PharosProperty( {
      name: 'pmid',
      label: 'PMID',
      externalLink: 'hi',
    })
  ], [
    'Title', new PharosProperty({
      name: 'title',
      label: 'title'
    })
  ], ['Text', new PharosProperty({
      name: 'text',
      label: 'Text'
    }
  )]
  ]
);
*/




@Component({
  selector: 'pharos-publication-info-panel',
  templateUrl: './publication-info-panel.component.html',
  styleUrls: ['./publication-info-panel.component.scss']
})
export class PublicationInfoPanelComponent extends DynamicTablePanelComponent implements OnInit {
  @Input() target: Target;
  references: Publication[];
  generifs: Publication[];
  referencePageData: PageData;
  rifPageData: PageData;
  targetPageData: PageData;
  timelines: any[] = [];
  tlMap: Map<string, any> = new Map<string, any>();
  publicationSerializer: PublicationSerializer = new PublicationSerializer();

  referenceTableFields: PharosProperty[] = [
    new PharosProperty({
      name: 'pmid',
      label: 'PMID',
      externalLink: 'http://www.ncbi.nlm.nih.gov/pubmed/',
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
      externalLink: 'hi',
      width: 10
    }),
    new PharosProperty({
      name: 'text',
      label: 'Text'
    })
  ];


  constructor(
    private navSectionsService: NavSectionsService,
    private _http: HttpClient,
    private ref: ChangeDetectorRef
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
              console.log(this);
              this.ngUnsubscribe.next();
              this.setterFunction();
            }
      });
  }

  setterFunction() {
    const references: Publication[] = this.data.references.map(publication => this.publicationSerializer.fromJson(publication));
    const rifs: Publication[] = this.data.generifs.map(publication => this.publicationSerializer.fromJson(publication));
    this.references = references.map(reference => reference = this.publicationSerializer._asProperties(reference));
    this.generifs = rifs.map(reference => reference = this.publicationSerializer._asProperties(reference));
    this.referencePageData = this.makePageData(this.target._publications.count);
    this.rifPageData = this.makePageData(this.data.generifCount.length);
    this.loading = false;
  //  this.mergeFields();
    this.fetchTimelineData();
    this.ref.markForCheck(); // refresh the component manually
  }

 /* paginate($event) {
    this.loading = true;
    // todo -- this isn't how pagination should happen - it should generate a new url, then navigate.
    // todo  == will that reload the entire page though?
    // todo -- this might be because the ! parameters are not query parameters and can't be passed as such
    this.http.get<any[]>(
      `${this.substance[`_${this.field}`].href}!revsort(type)!skip(${($event.pageIndex) * $event.pageSize})!limit(${$event.pageSize})`)
      .subscribe(res => {
        const names: Name[] = res.map(name => this.nameSerializer.fromJson(name));
        this.allData = names.map(name => name = this.nameSerializer._asProperties(name));
        this.loading = false;
      });
  }*/

  /*

  this.references = this.data.references.map(ref => ref = this.publicationSerializer.fromJson(ref));
    this.generifs = this.data.generifs.map(ref => ref = this.publicationSerializer.fromJson(ref));
    this.referencePageData = new PageData({
      top: 10,
      skip: 0,
      count: 10,
      total: this.target._publications.count
    });
    this.rifPageData = new PageData({
      top: 10,
      skip: 0,
      count: 10,
      total: this.data.generifCount.length
    });
    console.log(this);
  }
*/


  getTimeline(field: string): any {
    return this.tlMap.get(field);
  }

  fetchTimelineData(): void {
    this.data.timelines.forEach(timeline => {
      if (timeline.href && !this.tlMap.get(timeline.id)) {
        this._http.get<any>(timeline.href).subscribe(res => {
          const data: PharosPoint[] = [];
          res.events.forEach(point => {
            if (point.properties) {
              const val = point.properties.filter(prop => prop.label === 'Score');
              if (val.length > 0) {
                const pt: PharosPoint = {key: point.start, value: val[0].numval};
                data.push(pt);
              } else {
                const pt: PharosPoint = {key: point.start, value: point.end};
                data.push(pt);
              }
            }
          });
          this.tlMap.set(timeline.id, data);
          this.tlMap.set(res.name, data);
          this.loading = false;
        });
      }
    });
    ['PubMed Score', 'PubTator', 'Patent Count'].forEach(name => {
      const tl = this.tlMap.get(name);
      if (tl) {
        this.timelines.push(tl);
      }
    });
    this.timelines = this.timelines.filter((tl, index, arr) =>
      index === arr.findIndex(t => t.id === tl.id)
    );
  }

  raisePubtator() {
    if (this.target) {
      return Math.pow(10, this.target.pubTatorScore).toFixed(2);
    }
  }

  active(fragment: string) {
    console.log(fragment);
    this.navSectionsService.setActiveSection(fragment);
  }



}
