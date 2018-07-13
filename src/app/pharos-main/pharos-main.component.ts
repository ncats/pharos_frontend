import { Component } from '@angular/core';
import {FacetRetrieverService} from "./services/facet-retriever.service";

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
export class PharosMainComponent {

  constructor(
    private facetRetrieverService: FacetRetrieverService
  ){}

  loadFacets(){
    this.facetRetrieverService._loaded.next(true);
  }
}
