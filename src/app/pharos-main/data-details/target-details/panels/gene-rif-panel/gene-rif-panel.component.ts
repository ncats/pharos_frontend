import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {HttpClient} from "@angular/common/http";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Publication} from "../../../../../models/publication";

@Component({
  selector: 'pharos-gene-rif-panel',
  templateUrl: './gene-rif-panel.component.html',
  styleUrls: ['./gene-rif-panel.component.css']
})
export class GeneRifPanelComponent extends DynamicPanelComponent implements OnInit {
 displayColumns: string[] = ['pmid', 'text'];

  rifMap: Map<string, any> = new Map<string, any>();
  dataSource = new MatTableDataSource<Publication[]>();

  /* Paginator object from Angular Material */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _http: HttpClient) {
   // https://pharos.ncats.io/idg/struc/af7cbfd1-ffc0-431f-9ec5-fd7e3edf12ad.svg
    super();
  }

  ngOnInit() {
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
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // todo generic table was unable to update - this is either from a problem in material or the nested async calls
  // todo use rxjs to merge calls and return (some examples have 89+ results though)
  fetchData() {
    const tableArr = [];
  this.data.generif.forEach(rif => {
    if (rif.href && !this.rifMap.get(rif.id)) {
      this._http.get<any>(rif.href).subscribe(res => {
        this.rifMap.set(rif.id, res);
        tableArr.push({pmid: rif.properties.filter(p=> p.label === 'PubMed ID')[0].intval, text: res.text})
        this.dataSource.data = tableArr;
      });
    }
  });
}
}
