import {Component, OnInit, ViewChild} from '@angular/core';
import {FacetRetrieverService} from './services/facet-retriever.service';
import {HelpPanelOpenerService} from '../tools/help-panel/services/help-panel-opener.service';
import {MatDrawer, MatPaginator, MatSidenav} from '@angular/material';

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

  constructor(
    private facetRetrieverService: FacetRetrieverService,
    private helpPanelOpenerService: HelpPanelOpenerService
  ) {}

  ngOnInit() {
  this.helpPanelOpenerService.toggle$.subscribe(res => this.helpPanel.toggle());
  }

  loadFacets() {
    this.facetRetrieverService._loaded.next(true);
  }
}
