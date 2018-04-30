import { Component, OnInit } from '@angular/core';
import {ResponseParserService} from '../pharos-services/response-parser.service';

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
export class PharosMainComponent {}
