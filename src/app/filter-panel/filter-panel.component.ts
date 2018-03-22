import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseParserService} from "../services/response-parser.service";
import {Facet} from "../models/facet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {environment} from "../../environments/environment.prod";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'pharos-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent implements OnInit {
  facetsList: any;
  facets: Facet[];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private http: HttpClient,
              private ref: ChangeDetectorRef,
              private _route: ActivatedRoute,
              private _location: Location,
              private responseParserService: ResponseParserService) { }

  ngOnInit() {
    this.facets = [];
    let path: string = '';
    if(this._route.snapshot.url.length > 0) {
      path = this._route.snapshot.url.length[0].path;
    }else{
      path = this._location.path().split('/')[1];
    }
    this.facetsList = environment.functions[path].facets;
    this.responseParserService.facetsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res=> {
        console.log(res);
        console.log(this.facetsList);
        console.log(this._route.snapshot);
        this.facetsList.forEach(fct => res.filter(facet => {
          if (facet.name.toLowerCase() === fct.name.toLowerCase()) {
            facet.label = fct.label;
          this.facets.push(facet)
          }
        }));
      this.ref.markForCheck();
  });
  }

  trackByFn(index: string, item: Facet) {
    return item.name;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
