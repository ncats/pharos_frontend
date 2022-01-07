import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {autocompleteOption, SuggestApiService} from './suggest-api.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {SelectedFacetService} from "../../pharos-main/data-list/filter-panel/selected-facet.service";
import {Facet} from "../../models/facet";

/**
 * search component functionality. needs to be hooked up to a suggest api service
 * actual "search" is performed through url navigation options
 */
@Component({
  selector: 'pharos-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger, {static: true}) autocomplete: MatAutocompleteTrigger;
  /**
   * optional placeholder search string
   */
  @Input() placeholderStr?: string;

  /**
   * form control for text input
   * @type {FormControl}
   */
  typeaheadCtrl: FormControl = new FormControl();

  /**
   * observable list of returned responses
   */
  filteredGroups: Observable<any>;

  /**
   * sets up router and suggest service
   * @param {Router} _router
   * @param {SuggestApiService} suggestApiService
   */
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private suggestApiService: SuggestApiService,
    private selectedFacetService: SelectedFacetService
  ) {
  }


  /**
   * add placeholder string if required
   * set up subscription for input value changes
   * // todo: should unsubscribe
   */
  ngOnInit() {
    if (!this.placeholderStr) {
      this.placeholderStr = 'Search for targets (e.g., \'ITK\') or diseases (e.g., \'asthma\')';
    }
    this.filteredGroups = this.typeaheadCtrl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.suggestApiService.search(term?.trim()),
        ));
  }

  /**
   * adds facet for query and follows navigation patterns
   * @returns void
   */
  search(event?: any): void {
    if (this.isDoubleEvent(event)) {
      return;
    }
    let query = this.typeaheadCtrl.value;
    if (!query) {
      return;
    }
    this.typeaheadCtrl.setValue(null);
    this.autocomplete.closePanel();
    if (query.extra) {
      this.doSearch(query.extra);
    } else {
      if (query.trim().length > 2) {
        this.doSearch({path: 'search', parameter: 'q', value: query.trim()} as autocompleteOption);
      }
    }
  }

  doSearch(option: autocompleteOption) {
    const navigationExtras: NavigationExtras = {};
    navigationExtras.queryParams = autocompleteOption.getQueryParam(option);
    this._navigate(navigationExtras, autocompleteOption.getPath(option));
  }

  lastSelectionTime: number = undefined;
  autocompleteOption: any = autocompleteOption;

  isDoubleEvent(event: any) {
    if (event instanceof MatAutocompleteSelectedEvent) {
      this.lastSelectionTime = Date.now();
      return false;
    }
    if (!this.lastSelectionTime) {
      return false;
    }
    if (event instanceof KeyboardEvent) {
      return (Date.now() - this.lastSelectionTime) < 1000;
    }
    return false;
  }

  getTooltip(option: autocompleteOption): string {
    if (autocompleteOption.isDetailsPage(option)) {
      return `See details for ${option.path.slice(0, -1)}: ${option.reference_id}`;
    }
    if (option.reference_id) {
      return `See ${option.path} associated with ${Facet.getReadableParameter(option.parameter)}: ${option.reference_id}`;
    }
    if (option.facet) {
      return `See ${option.path} with ${option.facet}: ${option.value}`;
    }
    return option.value;
  }

  /**
   *  sends navigation parameters to router
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras, path: string[]): void {
    this.selectedFacetService.clearFacets();
    this._router.navigate(path, navExtras);
  }
}
