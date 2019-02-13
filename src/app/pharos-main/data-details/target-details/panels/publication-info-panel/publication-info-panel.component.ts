import { Component, OnInit } from '@angular/core';
import {from} from "rxjs/index";
import {takeUntil, zipAll} from "rxjs/operators";
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../models/target";
import {PageData} from "../../../../../models/page-data";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-publication-info-panel',
  templateUrl: './publication-info-panel.component.html',
  styleUrls: ['./publication-info-panel.component.scss']
})
export class PublicationInfoPanelComponent extends DynamicPanelComponent implements OnInit {
  targets: Target[];
  references: any[];
  generif: any[];
  allTargets: Target[] = [];
  targetPageData: PageData;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  ngOnInit() {
    console.log(this);
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
    this.references = this.data.references;
  }

  paginateTargets($event) {
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

}
