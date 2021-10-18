import {Component, Input, OnInit} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {PathResolverService} from '../../pharos-main/data-list/filter-panel/path-resolver.service';
import {NavigationExtras, Router} from '@angular/router';
import {SelectedFacetService} from '../../pharos-main/data-list/filter-panel/selected-facet.service';

@Component({
  selector: 'pharos-explore-list-button',
  templateUrl: './explore-list-button.component.html',
  styleUrls: ['./explore-list-button.component.scss']
})
export class ExploreListButtonComponent implements OnInit {

  constructor(private _router: Router, private selectedFacetService: SelectedFacetService) {
  }

  @Input() path: string;
  @Input() queryParams: any;
  @Input() buttonText: string;
  @Input() facetName: string;

  ngOnInit(): void {
  }

  getTooltip() {
    const listName = this.path.replace('/', '').toLowerCase().slice(0, this.path.length - 2);
    const listTitle = new TitleCasePipe().transform(listName);
    if (this.facetName) {
      return `Find ${listTitle}s with an overlapping set of ${this.facetName}`;
    }
    return `Opens the ${listTitle} List with this set of ${listName}s`;
  }


  nav() {
    this.selectedFacetService.clearFacets();
    const navigationExtras: NavigationExtras = {
      queryParams: this.queryParams
    };

    this._router.onSameUrlNavigation = 'reload'; // forces reload since this is the same navigation url
    this._router.navigate([this.path], navigationExtras);

  }
}
