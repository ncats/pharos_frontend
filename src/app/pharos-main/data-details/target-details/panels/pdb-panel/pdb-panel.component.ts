import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {TableData} from "../../../../../models/table-data";
import {Ortholog} from "../../../../../models/ortholog";
import {Property} from "../../../../../models/property";
import {HttpClient} from "@angular/common/http";
import {PdbReportData} from "../../../../../models/pdb-report";

const REPORT_URL ='https://www.rcsb.org/pdb/rest/customReport.csv?customReportColumns=structureId,ligandId,ligandSmiles,' +
  'EC50,IC50,Ka,Kd,Ki,pubmedId,releaseDate,experimentalTechnique,structureTitle&service=wsfile&format=csv&pdbids=';


@Component({
  selector: 'pharos-pdb-panel',
  templateUrl: './pdb-panel.component.html',
  styleUrls: ['./pdb-panel.component.sass']
})
export class PdbPanelComponent  extends DynamicPanelComponent implements OnInit {
  fields: TableData[] = [
    new TableData({
      name: 'pdb',
      label: 'PDB ID',
      sortable: true
    }),
   /* new TableData( {
      name: 'source',
      label: 'Source',
      externalLink: true
    })*/
  ];
  tableArr: any[] = [];
  tableArr2: any[] = [];


  test: string;
  test1: string;
  test2: string;
  test3: string;

  constructor(private _http: HttpClient) {
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
    const terms = this.data.pdb.map(pdb => pdb = pdb.term);
    console.log(this);
    console.log(terms);
    this._http.get(REPORT_URL + terms.join(','), {responseType: 'text'}).subscribe(res => {
      this.csvJSON(res);
    })
    const datas:any[] = [];
    this.data.pdb.forEach(obj => {
      // create new object to get Property class properties
      const labelProp: Property = new Property(obj);
      labelProp.externalHref = obj.href;
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
        const currentline = i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const data: {} = {};
        for (const j of Object.keys(headers)) {
          // todo : switch to global replace
          data[headers[j]] = currentline[j].replace('"',  '').replace('"',  '');
        }
        const pdb: PdbReportData = new PdbReportData(data);
        this.tableArr.push(pdb);
      }
    }
  }


}
