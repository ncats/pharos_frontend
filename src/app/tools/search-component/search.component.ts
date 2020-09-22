import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SuggestApiService} from './suggest-api.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';

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

  @Input() listType: string = "targets";
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
    private suggestApiService: SuggestApiService
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
        switchMap(term => this.suggestApiService.search(term, this.listType),
        ));
  }

  /**
   * adds facet for query and follows navigation patterns
   * @returns void
   */
  search(wildcard?: boolean): void {
    this.autocomplete.closePanel();
    let query = this.typeaheadCtrl.value;
    if (wildcard) {
      query = `${query}.*`;
    }
    const navigationExtras: NavigationExtras = {};
    navigationExtras.queryParams = {q: query};
    this._navigate(navigationExtras);
  }

  /**
   *  sends navigation parameters to router
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras): void {
    this._router.navigate(['/' + this.listType], navExtras);
  }
}
