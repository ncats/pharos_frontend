import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {PathResolverService} from '../../pharos-main/data-list/filter-panel/path-resolver.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {SelectedFacetService} from '../../pharos-main/data-list/filter-panel/selected-facet.service';
import {FeatureTrackingService} from '../../pharos-services/feature-tracking.service';
import {CentralStorageService} from '../../pharos-services/central-storage.service';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatTooltip, MatButton, MatIcon],
  selector: 'pharos-explore-list-button',
  templateUrl: './explore-list-button.component.html',
  styleUrls: ['./explore-list-button.component.scss']
})
export class ExploreListButtonComponent implements OnInit {

  constructor(
    private _router: Router,
    private selectedFacetService: SelectedFacetService,
    private featureTrackingService: FeatureTrackingService,
    private centralStorageService: CentralStorageService,
    private _route: ActivatedRoute) {
  }

  @Input() path: string;
  @Input() queryParams: any;
  @Input() buttonText: string;
  @Input() facetName: string;

  ngOnInit(): void {
  }

  getListName() {
    return this.path.replace('/', '').toLowerCase().slice(0, this.path.length - 2);
  }

  getListTitle() {
    return new TitleCasePipe().transform(this.getListName());
  }

  getTooltip() {
    const listName = this.getListName();
    const listTitle = this.getListTitle();
    if (this.facetName) {
      return `Find ${listTitle}s with an overlapping set of ${this.facetName}`;
    }
    return `Opens the ${listTitle} List with this set of ${listName}s`;
  }

  getPath() {
    return this.path ;
  }

  nav() {
    if (this.facetName) {
      this.featureTrackingService.trackFeature(`Similar ${this.getListTitle()}s List`,
        this.centralStorageService.getModel(this._route), this.facetName);
    } else {
      this.featureTrackingService.trackFeature('Associated Model List',
        this.centralStorageService.getModel(this._route), this.buttonText);
    }
    this.selectedFacetService.clearFacets();
    const navigationExtras: NavigationExtras = {
      queryParams: this.queryParams
    };

    this._router.onSameUrlNavigation = 'reload'; // forces reload since this is the same navigation url
    this._router.navigate([this.path], navigationExtras);
  }
}
