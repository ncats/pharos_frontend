import {Component, OnInit, ViewChild} from '@angular/core';
import {FacetRetrieverService} from './data-list/filter-panel/facet-retriever.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer, MatSidenav} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {FilterPanelComponent} from "./data-list/filter-panel/filter-panel.component";
import {LoadingService} from "../pharos-services/loading.service";

@Component({
  selector: 'pharos-pharos-main',
  templateUrl: './pharos-main.component.html',
  styleUrls: ['./pharos-main.component.css']
})
export class PharosMainComponent implements OnInit {

  /**
   * boolean for mobile view
   * @type {boolean}
   */
  isSmallScreen = false;

  loading = true;
  /**
   * check viewport size
   * @param {BreakpointObserver} breakpointObserver
   * @param {LoadingService} loadingService
   */
  constructor(
    public breakpointObserver: BreakpointObserver,
    public loadingService: LoadingService
) {
}

  /**
   * check screen size  and subscribe to help panel changes
   */
  ngOnInit() {
    console.log("loading main component")
    this.loadingService.loading$.subscribe(res=> this.loading = res);
  this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  }
}
