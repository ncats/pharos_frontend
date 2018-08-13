import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SuggestApiService} from './suggest-api.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'pharos-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
@Input() placeholderStr?: string;

  typeaheadCtrl: FormControl = new FormControl();
  filteredGroups: Observable<any>;
  groups: any[] = [];

  constructor(
    private _router: Router,
    private suggestApiService: SuggestApiService
  ) {  }


  /**
   *add placeholder string if required
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
        switchMap(term => this.suggestApiService.search(term),
        ));
  }

  /**
   * adds facet for query and follows navigation patterns
   * @returns void
   */
  search(): void {
    const query = '"' + this.typeaheadCtrl.value.replace(/ /g, '+')  + '"';
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
    this._router.navigate(['/search'], navExtras);

  }
}
