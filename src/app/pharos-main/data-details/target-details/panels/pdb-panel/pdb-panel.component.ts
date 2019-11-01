import {ChangeDetectionStrategy, ChangeDetectorRef, Component, InjectionToken, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {PharosProperty} from '../../../../../models/pharos-property';
import {HttpClient} from '@angular/common/http';
import {PdbReportData, PdbReportSerializer} from '../../../../../models/pdb-report';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PageData} from '../../../../../models/page-data';
import {Target} from '../../../../../models/target';
import {BehaviorSubject} from 'rxjs';

/**
 * token to inject structure viewer into generic table component
 * @type {InjectionToken<any>}
 */
export const STRUCTURE_VIEW_TOKEN = new InjectionToken('StructureViewComponent');

/**
 * pbd report generating url
 * @type {string}
 */
const REPORT_URL = 'https://www.rcsb.org/pdb/rest/customReport.csv?customReportColumns=structureId,ligandId,ligandSmiles,' +
  'EC50,IC50,Ka,Kd,Ki,pubmedId,releaseDate,experimentalTechnique,structureTitle&service=wsfile&format=csv&pdbids=';

/**
 * component to fetch data from the rcsb protein databank and display tested ligands nested in a protein structure
 */
@Component({
  selector: 'pharos-pdb-panel',
  templateUrl: './pdb-panel.component.html',
  styleUrls: ['./pdb-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdbPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  @Output() selfDestruct: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  /**
   * fields to be show in the pdb table
   * @type {PharosProperty[]}
   */
  fieldsData: PharosProperty[] = [
    new PharosProperty({
      name: 'structureId',
      label: 'PDB Structure Id',
    }),
    new PharosProperty({
  name: 'pubmedId',
  label: 'PMID'
}),
    new PharosProperty({
  name: 'ligandId',
    label: 'Ligand Id'
}),
    new PharosProperty({
  name: 'ligandSmiles',
    label: 'Ligand',
  customComponent: STRUCTURE_VIEW_TOKEN
}),
    new PharosProperty({
  name: 'activities',
    label: 'Activity'
}),
    new PharosProperty({
  name: 'experimentalTechnique',
    label: 'Method'
}),
    new PharosProperty({
  name: 'structureTitle',
    label: 'Title'
})
];

  shortFieldsData: PharosProperty[] = [
    new PharosProperty({
      name: 'structureId',
      label: 'PDB Structure Id',
    }),
    new PharosProperty({
      name: 'pubmedId',
      label: 'PMID'
    }),
    new PharosProperty({
      name: 'ligandId',
      label: 'Ligand Id'
    }),
    new PharosProperty({
      name: 'ligandSmiles',
      label: 'Ligand',
      customComponent: STRUCTURE_VIEW_TOKEN
    })
    ];

  @Input() target: Target;
  /**
   * all retrieved reports
   * @type {any[]}
   */
  reports: PdbReportData[] = [];
  /**
   * list of pharos property objects to display in table
   * @type {any[]}
   */
  tableArr: any[] = [];

  /**
   * pagination data object
   */
  pageData: PageData;

  /**
   * active pdb id shown in protein structure viewer
   */
  pdbid: string;

  /**
   * serializer to parse json into classes
   * @type {PdbReportSerializer}
   */
  pdbReportSerializer: PdbReportSerializer = new PdbReportSerializer();

  /**
   * set up httpservice
   * @param {NavSectionsService} navSectionsService
   * @param changeRef
   * @param {HttpClient} _http
   */
  constructor(
    private navSectionsService: NavSectionsService,
    private changeRef: ChangeDetectorRef,
    private _http: HttpClient) {
    super();
  }

  /**
   * set up subscription to watch for data change
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
          this.target = this.data.targets;
        if (this.target.pdbs && this.target.pdbs.length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
          this.loading = false;
        } else {
          this.navSectionsService.removeSection(this.field);
          this.selfDestruct.next(true);
        }
      });
  }

  /**
   * fetch pdb data from rcsb, create pagedata object and parse first page of reports
   */
  setterFunction() {
    this.tableArr = [];
    this.reports = [];
    const pdbsArr: any[] = this.target.pdbs.map<any>(pdb => pdb = pdb.pdbs);
    this._http.get(REPORT_URL + pdbsArr.join(','), {responseType: 'text'}).subscribe(res => {
        this.csvJSON(res);
      this.pageData = this.makePageData(this.reports.length);
      this.tableArr = this.reports
          .slice(this.pageData.skip, this.pageData.top)
        .map(report => this.pdbReportSerializer._asProperties(report));
      const pdbids = this.tableArr.find(entry => entry.structureId.term && entry.ligandId.term);
      if (pdbids) {
        this.pdbid = pdbids.structureId.term;
      }
      this.changeRef.markForCheck();
    });
  }

  /**
   * convert csv from rcsb to json
   * maps json to typed pdbreport object
   * @param {string} csv
   */
  private csvJSON(csv: string): void {
    const lines: string[] = csv.split(/\r\n|\n/);
    const headers = lines.shift().split(',');
    if (lines.length > 0) {
      for (const i of lines) {
        if (i) {
          const currentline = i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          const data: {} = {};
          for (const j of Object.keys(headers)) {
            data[headers[j]] = currentline[j].replace(/"/g, '');
          }
          const pdb: PdbReportData = this.pdbReportSerializer.fromJson(data);
          this.reports.push(pdb);
        }
      }
    }
  }

  /**
   * paginate the pdb table. The raw data is converted into properties objects after slicing
   * @param event
   */
  pagePDB(event) {
    this.tableArr = this.reports.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize)
      .map(report => this.pdbReportSerializer._asProperties(report));
    this.changeRef.markForCheck();
  }

  /**
   * change the molecule displayed in the protein structure viewer
   * @param entry
   */
  changePdbId(entry: any) {
    if (this.pdbid !== entry.structureId.term) {
      this.pdbid = entry.structureId.term;
      this.changeRef.markForCheck();
    }
  }

  /**
   * checks to see if the display section is within view
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._data.unsubscribe();
  }
}
