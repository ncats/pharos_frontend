import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../../../models/pharos-property';
import {HttpClient} from '@angular/common/http';
import {PdbReportData, PdbReportSerializer} from '../../../../../models/pdb-report';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {from} from "rxjs/index";
import * as d3 from 'd3';

const REPORT_URL = 'https://www.rcsb.org/pdb/rest/customReport.csv?customReportColumns=structureId,ligandId,ligandSmiles,' +
  'EC50,IC50,Ka,Kd,Ki,pubmedId,releaseDate,experimentalTechnique,structureTitle&service=wsfile&format=csv&pdbids=';


@Component({
  selector: 'pharos-pdb-panel',
  templateUrl: './pdb-panel.component.html',
  styleUrls: ['./pdb-panel.component.sass']
})
export class PdbPanelComponent extends DynamicPanelComponent implements OnInit {

  fieldsData: PharosProperty[] = [
    {
      name: 'structureId',
      label: 'PDB Structure Id',
    },
{
  name: 'pubmedId',
  label: 'PMID'
},
{
  name: 'chainId',
    label: 'Chain Id',
},
{
  name: 'ligandId',
    label: 'Ligand Id'
},
{
  name: 'ligandSmiles',
    label: 'Ligand',
  /*
  customComponent: STRUCTURE_DISPLAY_TOKEN
*/
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
  tableArr2: any[] = [];


  test: string;
  test1: string;
  test2: string;
  test3: string;

  pdbReportSerializer: PdbReportSerializer = new PdbReportSerializer();

  constructor(
    private navSectionsService: NavSectionsService,
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
/*    from(d3.csv(REPORT_URL + terms.join(','), report => this.pdbReportSerializer.fromJson(report)))
      .subscribe(res => {
      console.log(res);
        Array.from(res).pop()
          */
        this.tableArr = this.reports
          .filter(entry => entry.ligandId)
          .slice(0,10).map(report => this.pdbReportSerializer._asProperties(report));
        // this.fieldsData = Array.from(Object.values(this.tableArr[0]));
    });

 /*   this._http.get(REPORT_URL + terms.join(','), {responseType: 'text'}).subscribe(res => {
      console.log(res);
    //  this.csvJSON(res);

    });*/
    const datas: any[] = [];
    this.data.pdb.forEach(obj => {
      // create new object to get PharosProperty class properties
      const labelProp: PharosProperty = obj as PharosProperty;
      labelProp.externalLink = obj.href;
      datas.push({pdb: labelProp});
    });
    this.tableArr2 = datas;
 /*   this.test = this.tableArr[0].pdb.term;
    this.test1 = this.tableArr[1].pdb.term;
    this.test2 = this.tableArr[2].pdb.term;
    this.test3 = this.tableArr[3].pdb.term;*/
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

  pagePDB() {

  }

  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
