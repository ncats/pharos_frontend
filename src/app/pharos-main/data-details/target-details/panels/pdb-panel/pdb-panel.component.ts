import {ChangeDetectorRef, Component, InjectionToken, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {PharosProperty} from '../../../../../models/pharos-property';
import {HttpClient} from '@angular/common/http';
import {PdbReportData, PdbReportSerializer} from '../../../../../models/pdb-report';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from "../../../../../tools/dynamic-table-panel/dynamic-table-panel.component";
import {PageData} from "../../../../../models/page-data";

/**
 * token to inject structure viewer into generic table component
 * @type {InjectionToken<any>}
 */
export const STRUCTURE_VIEW_TOKEN = new InjectionToken("StructureViewComponent");

/**
 * pbd report generating url
 * @type {string}
 */
const REPORT_URL = 'https://www.rcsb.org/pdb/rest/customReport.csv?customReportColumns=structureId,ligandId,ligandSmiles,' +
  'EC50,IC50,Ka,Kd,Ki,pubmedId,releaseDate,experimentalTechnique,structureTitle&service=wsfile&format=csv&pdbids=';


@Component({
  selector: 'pharos-pdb-panel',
  templateUrl: './pdb-panel.component.html',
  styleUrls: ['./pdb-panel.component.sass']
})
export class PdbPanelComponent extends DynamicTablePanelComponent implements OnInit {

  fieldsData: PharosProperty[] = [
    {
      name: 'structureId',
      label: 'PDB Structure Id',
    },
{
  name: 'pubmedId',
  label: 'PMID'
},
/*{
  name: 'chainId',
    label: 'Chain Id',
},*/
{
  name: 'ligandId',
    label: 'Ligand Id'
},
{
  name: 'ligandSmiles',
    label: 'Ligand',
  customComponent: STRUCTURE_VIEW_TOKEN
},
{
  name: 'activities',
    label: 'Activity'
},
{
  name: 'experimentalTechnique',
    label: 'Method'
},
{
  name: 'structureTitle',
    label: 'Title'
}
];

  reports: PdbReportData[] = [];
  tableArr: PdbReportData[] = [];

  pageData: PageData;


  pdbid: string;

  pdbReportSerializer: PdbReportSerializer = new PdbReportSerializer();

  constructor(
    private navSectionsService: NavSectionsService,
    private ref: ChangeDetectorRef,
    private _http: HttpClient) {
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
    console.log(this);
    this.tableArr = [];
    this.reports = [];
    const terms = this.data.pdb.map(pdb => pdb = pdb.term);
    console.log(terms);
    this._http.get(REPORT_URL + terms.join(','), {responseType: 'text'}).subscribe(res => {
        this.csvJSON(res);
        this.reports = this.reports
          .filter(entry => entry.ligandId);

      this.pageData = this.makePageData(this.reports.length);
      this.tableArr = this.reports
          .slice(this.pageData.skip, this.pageData.top)
        .map(report => this.pdbReportSerializer._asProperties(report));
      this.pdbid = this.tableArr[0].structureId['term'];
      this.ref.detectChanges();
      console.log(this.pageData);

    });
    console.log(this.pageData);
  }

  private csvJSON(csv: string): void {
    const lines: string[] = csv.split(/\r\n|\n/);

    const headers = lines.shift().split(',');
    if (lines.length > 0) {
      for (const i of lines) {
        if(i) {
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

  pagePDB(event) {
    console.log(event);
    this.tableArr = this.reports.slice(event.pageIndex * event.pageSize, (event.pageIndex +1) * event.pageSize)
      .map(report => this.pdbReportSerializer._asProperties(report));
  }

  changePdbId(entry: any) {
    console.log(entry);
    if(this.pdbid !== entry.structureId.term) {
      this.pdbid = entry.structureId.term;
    }
  }

  /**
   * checks to see if the display section is within view
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
