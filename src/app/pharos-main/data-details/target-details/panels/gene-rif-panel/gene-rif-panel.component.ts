import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {TableData} from "../../../../../models/table-data";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-gene-rif-panel',
  templateUrl: './gene-rif-panel.component.html',
  styleUrls: ['./gene-rif-panel.component.css']
})
export class GeneRifPanelComponent extends DynamicPanelComponent implements OnInit {
  // data: any;
 // displayColumns: string[] = ['pmid', 'title'];
  fields: TableData[] = [
    new TableData({
      name: 'pmid',
      label: 'PMID',
      externalLink: true
    }),
    new TableData( {
      name: 'text',
      label: 'Text'
    })
  ];

  tableArr: any[] = [];
  rifMap: Map<string, any> = new Map<string, any>();

  constructor(
    private changeDetectorRef : ChangeDetectorRef,
    private _http: HttpClient) {
    super();
  }

  ngOnInit() {
    //  this.data = {references: []};
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if (this.data.generif && this.data.generif.length > 0) {
          this.fetchData();
          //this.dataSource.data = this.data.references;
        }
      });
  }
fetchData() {
    this.tableArr = [];
  this.data.generif.forEach(rif => {
    if (rif.href && !this.rifMap.get(rif.id)) {
      this._http.get<any>(rif.href).subscribe(res => {
        this.rifMap.set(rif.id, res);
        this.tableArr.push({pmid: rif.properties.filter(p=> p.label === 'PubMed ID')[0].intval, text: res.text})
      });
    }
  });
}

getTableData() {
    console.log(this.tableArr);
    return this.tableArr;
}
}
