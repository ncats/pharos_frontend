import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseParserService} from "../services/response-parser.service";
import {Facet} from "../models/facet";

@Component({
  selector: 'pharos-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent implements OnInit {
  facets: any;
  constructor(private http: HttpClient,
              private ref: ChangeDetectorRef,
              private responseParserService: ResponseParserService) { }

  ngOnInit() {
    this.responseParserService.facetsData$.subscribe(res=> {
      this.facets = res.slice(0,10);
     this.ref.markForCheck();
  });
  }

  trackByFn(index: string, item: Facet) {
    return item.name;
  }
}
