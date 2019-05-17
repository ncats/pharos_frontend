import {Component, OnInit, ViewChild} from '@angular/core';
import {FacetRetrieverService} from './data-list/filter-panel/facet-retriever.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer, MatSidenav} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {FilterPanelComponent} from "./data-list/filter-panel/filter-panel.component";

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

  /**
   * set up help panel
   * @param {HelpPanelOpenerService} helpPanelOpenerService
   * @param {BreakpointObserver} breakpointObserver
   */
  constructor(
    public breakpointObserver: BreakpointObserver
) {
}

  /**
   * check screen size  and subscribe to help panel changes
   */
  ngOnInit() {
  this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  }
}
