import {Component, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from '@angular/common/http';
import {map, zipAll, takeUntil} from 'rxjs/operators';
import {from} from "rxjs/index";
import {PageData} from "../../../../../../models/page-data";


interface GenerifData {
  generif?: any;
  data?: any;
  pmid?: string;
  text?: string;
}

@Component({
  selector: 'pharos-gene-rif-panel',
  templateUrl: './gene-rif-panel.component.html',
  styleUrls: ['./gene-rif-panel.component.css']
})
export class GeneRifPanelComponent extends DynamicPanelComponent implements OnInit {
 displayColumns: string[] = ['pmid', 'text'];
  rifPageData: PageData;
  allGeneRifs : any[];
  geneRifs : any[];

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
    console.log(this);

    const generifObserv = this.data.generif.filter(obj => obj.href);
    from(generifObserv.map(generif => generif = {generif: generif, data: this.getData(generif.href)} as GenerifData))
      .pipe(
      map(res => {
        return res['data'].pipe(
          map(response => {
            const data: GenerifData = {pmid: res['generif'].properties.filter(p => p.label === 'PubMed ID')[0].intval, text: response['text']};
            return data;
          }));
      }),
      zipAll()
    ).subscribe(res => {
    this.allGeneRifs = res;
    this.rifPageData = new PageData({
        top: 10,
        skip: 0,
        count: 10,
        total: this.allGeneRifs.length
      });
      this.geneRifs = this.allGeneRifs.slice(this.rifPageData.skip, this.rifPageData.top);
    });
   }

  paginateGenerifs($event) {
    this.geneRifs = this.allGeneRifs.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

/*  paginateReferences($event) {
    this.loading = true;
    this.http.get<any>(`${this.target._publications.href}?top=${$event.pageSize}&skip=${($event.pageIndex) * $event.pageSize}`)
      .subscribe(res => {
        this.dataSource.data = res.filter(ref => !!ref);
        this.loading = false;
      });
  }*/

getData(url: string): any {
  return this._http.get<any[]>(url);
}
}
