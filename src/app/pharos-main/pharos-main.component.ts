import {Component, OnInit, ViewChild} from '@angular/core';
import {FacetRetrieverService} from './data-list/filter-panel/facet-retriever.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';

/**
 *Pharos main component contains:
 *
 *NCATS Header
 *
 * sidenav panel for facets
 *
 * breadcrumb component
 *
 * facet visualizations
 *
 * list of selected facets
 *
 * table data
 *
 * scroll to top button
 *
 * NCATS footer
 */
@Component({
  selector: 'pharos-pharos-main',
  templateUrl: './pharos-main.component.html',
  styleUrls: ['./pharos-main.component.css']
})
export class PharosMainComponent implements OnInit {

  /**
   * help panel element
   */
  @ViewChild('helppanel') helpPanel: MatDrawer;

  /**
   * boolean for mobile view
   * @type {boolean}
   */
  isSmallScreen = false;

  /**
   * set up facets and help panels
   * @param {FacetRetrieverService} facetRetrieverService
   * @param {HelpPanelOpenerService} helpPanelOpenerService
   * @param {BreakpointObserver} breakpointObserver
   */
  constructor(
    private facetRetrieverService: FacetRetrieverService,
    private helpPanelOpenerService: HelpPanelOpenerService,
    public breakpointObserver: BreakpointObserver
) {
}

  /**
   * check screen size  and subscribe to help panel changes
   */
  ngOnInit() {
  this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  this.helpPanelOpenerService.toggle$.subscribe(res => this.helpPanel.toggle());
  }

  /**
   * get all facets
   */
  loadFacets() {
    this.facetRetrieverService._loaded.next(true);
  }
}
