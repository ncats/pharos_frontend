import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {ResponseParserService} from "../../pharos-services/response-parser.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'pharos-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']
})
export class DataDetailsComponent implements OnInit, OnDestroy {
  data: any;
  private ngUnsubscribe: Subject<any> = new Subject();


  constructor(private responseParserService: ResponseParserService) { }

  ngOnInit() {
    this.responseParserService.detailsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        console.log(res);
        this.data = res;
      });
    console.log(this);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
