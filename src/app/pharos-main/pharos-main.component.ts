import {Component, OnInit, ViewChild} from '@angular/core';
import {FacetRetrieverService} from './services/facet-retriever.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer, MatPaginator, MatSidenav} from '@angular/material';
import {BreakpointObserver} from "@angular/cdk/layout";

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
  @ViewChild('helppanel') helpPanel: MatDrawer;
  isSmallScreen = false;

  constructor(
    private facetRetrieverService: FacetRetrieverService,
    private helpPanelOpenerService: HelpPanelOpenerService,
    public breakpointObserver: BreakpointObserver
) {
}

ngOnInit() {
  this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  this.helpPanelOpenerService.toggle$.subscribe(res => this.helpPanel.toggle());
  console.log(this.isSmallScreen);
  }

  loadFacets() {
    this.facetRetrieverService._loaded.next(true);
  }
}
