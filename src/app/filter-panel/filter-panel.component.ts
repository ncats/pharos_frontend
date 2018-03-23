import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseParserService} from "../services/response-parser.service";
import {Facet} from "../models/facet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {EnvironmentVariablesService} from "../services/environment-variables.service";

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
              private router : Router,
              private environmentVariablesService: EnvironmentVariablesService,
              private responseParserService: ResponseParserService) { }

  ngOnInit() {
    this.facets = [];
    this.facetsList = [];
    this.responseParserService.facetsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res=> {
        // todo: this seems like a convoluted way of getting the base path...
        this.facetsList = this.environmentVariablesService.getFacets(this.router.url.split('/')[1].split('?')[0]);
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
