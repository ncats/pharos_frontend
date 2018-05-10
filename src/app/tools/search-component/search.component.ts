import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SuggestApiService} from './suggest-api.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';

const navigationExtras: NavigationExtras = {
};

@Component({
  selector: 'pharos-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
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
   * placeholder until search UI is hooked up
   * @returns void
   */
  search(): void {
    const query = '"' + this.typeaheadCtrl.value.replace(/ /g, '+')  + '"';
    navigationExtras.queryParams = {q: query, top: 1000};
    this._navigate(navigationExtras);
  }

  private _navigate(navExtras: NavigationExtras): void {
    this._router.navigate(['/search'], navExtras);

  }
}
