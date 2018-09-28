import { Component, OnInit } from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from "@angular/common/http";
import {Target} from "../../../../../../app/models/target";
import {PageData} from "../../../../../../app/models/page-data";
import {map, zipAll} from "rxjs/internal/operators";
import {from} from "rxjs/index";

@Component({
  selector: 'pharos-protein-protein-panel',
  templateUrl: './protein-protein-panel.component.html',
  styleUrls: ['./protein-protein-panel.component.css']
})
export class ProteinProteinPanelComponent extends DynamicPanelComponent implements OnInit {
  targets: Target[];
  allTargets: Target[] = [];
  targetPageData: PageData;

  constructor(
    private http: HttpClient
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
        this.targets = [];
       if(this.data.interactions && this.data.interactions.content.length > 0 ){
         this.ngUnsubscribe.next();

         from(this.data.interactions.content[0].objects.map(obj => {
           return this.http.get<Target>(obj.href)
         })).pipe(
           zipAll()
         ).subscribe(res=> {
           this.allTargets = res as Target[];
           this.targetPageData = new PageData({
             top: 10,
             skip: 0,
             count: 10,
             total: this.allTargets.length
           });
           this.targets = this.allTargets.slice(this.targetPageData.skip, this.targetPageData.top);
           }
         );
       }
      });
  }

  paginateTargets($event) {
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

}
