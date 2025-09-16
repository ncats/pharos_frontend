import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {autocompleteOption, SuggestApiService} from './suggest-api.service';
import {Observable} from 'rxjs';
import {FormsModule, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {SelectedFacetService} from '../../pharos-main/data-list/filter-panel/selected-facet.service';
import {Facet} from '../../models/facet';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HighlightPipe} from './highlight.pipe';
import {MatTooltip} from '@angular/material/tooltip';

/**
 * search component functionality. needs to be hooked up to a suggest api service
 * actual "search" is performed through url navigation options
 */
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, ReactiveFormsModule, MatAutocomplete, MatButtonModule,
    MatIconModule, MatAutocompleteTrigger, MatOption, HighlightPipe, MatTooltip],
  selector: 'pharos-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  @ViewChild('typeaheadTarget', {static: true}) typeaheadTarget: ElementRef;

  @ViewChild(MatAutocompleteTrigger, {static: true}) autocomplete: MatAutocompleteTrigger;
  @Input() customCallback = null;
  /**
   * optional placeholder search string
   */
  @Input() placeholderStr?: string;
  @Input() fixedwidthDropdown = false;
  @Input() detailsOnly = false;

  /**
   * form control for text input
   * @type {FormControl}
   */
  typeaheadCtrl: UntypedFormControl = new UntypedFormControl();

  /**
   * observable list of returned responses
   */
  filteredGroups: Observable<any>;

  lastSelectionTime: number = undefined;
  autocompleteOption: any = autocompleteOption;
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
        switchMap(term => {
          return this.suggestApiService.search(term?.trim(), this.detailsOnly);
          },
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
    if (this.detailsOnly) {
      if (this.customCallback) {
        this.customCallback(this.typeaheadCtrl.value);
      }
      this.typeaheadCtrl.setValue(this.typeaheadCtrl.value.extra.value +
          ` (${this.toSingleTitleCase(this.typeaheadCtrl.value.extra.path)})`);
      this.autocomplete.closePanel();
      return;
    }
    const query = this.typeaheadCtrl.value;
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

  toSingleTitleCase(type: string) {
    let listName = type.replace('/', '').toLowerCase();
    if (type.endsWith('s')) {
      listName = listName.slice(0, type.length - 1);
    }
    return listName.charAt(0).toUpperCase() + listName.slice(1);
  }

  doSearch(option: autocompleteOption) {
    const navigationExtras: NavigationExtras = {};
    navigationExtras.queryParams = autocompleteOption.getQueryParam(option);
    this._navigate(navigationExtras, autocompleteOption.getPath(option));
  }


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
    if (option.parameter === 'collection') {
      return `See the collection of ${option.path} `;
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
