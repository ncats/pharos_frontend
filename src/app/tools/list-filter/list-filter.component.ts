import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {PageData} from '../../models/page-data';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';
import {Observable, Subscription} from 'rxjs';
import {BaseResource} from '../../models/idg-resources/base-resource';

/**
 * Component to show a Filter / Paginator component for a card full of Resources
 */
@Component({
  selector: 'pharos-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})

export class ListFilterComponent implements OnInit, OnDestroy {

  /**
   * the full list
   */
  @Input() fullList: Array<BaseResource>;
  /**
   * an observable to pass for responding to updates to the list
   */
  @Input() fullListUpdates: Observable<void>;
  /**
   * the subscription for updates to the list
   */
  updateSubscription: Subscription;

  /**
   * an intermediary list, for filtering the full list, before doing the pagination
   */
  filteredList: Array<BaseResource>;
  /**
   * The filtered list to send back to the panel
   */
  @Input() visibleList: Array<BaseResource>;
  /**
   * event to fire changes back ot the panel
   */
  @Output() visibleListChange = new EventEmitter<Array<BaseResource>>();
  /**
   * pageData info for the paginator
   */
  @Input() pageData: PageData;
  /**
   * list of different resourceTypes to use for the filter options
   */
  types: string[] = [];

  constructor() {
  }

  /**
   * The control for selecting different filters
   */
  filterCtrl: UntypedFormControl = new UntypedFormControl();

  /**
   * initializes lists and subscriptions
   */
  ngOnInit(): void {
    this.updateSubscription = this.fullListUpdates.subscribe(() => this.initializeLists());
    this.initializeLists();
    this.filterCtrl.valueChanges.subscribe({next: change => this.filterValueChanged(change)});
  }

  /**
   * clean up subscription
   */
  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

  /**
   * creates the array of types for the list
   */
  private initializeLists() {
    this.filteredList = this.fullList;
    this.types = Array.from(new Set(this.fullList.map(listItem => listItem.resourceType))).map(listItem => {
      const ret: any = {
        value: listItem,
        label: listItem
      };
      return ret;
    });
    this.sliceFilteredList();
  }

  /**
   * respond to changes in the filter selections
   * @param change
   */
  filterValueChanged(change) {
    if (change.length === 0) {
      this.filteredList = this.fullList;
    } else {
      this.filteredList = [];
      change.forEach(field => {
        this.filteredList.push(...this.fullList.filter(listItem => listItem.resourceType === field));
      });
    }
    this.pageData.skip = 0;
    this.pageData.total = this.filteredList.length;
    this.sliceFilteredList();
  }

  /**
   * move to a different page of results
   * @param event
   */
  paginate(event: PageEvent) {
    this.pageData.skip = event.pageIndex * event.pageSize;
    this.pageData.top = event.pageSize;
    this.sliceFilteredList();
  }

  /**
   * trim the filtered list for paging
   */
  sliceFilteredList() {
    this.visibleList = this.filteredList.slice(this.pageData.skip, this.pageData.skip + this.pageData.top);
    this.visibleListChange.emit(this.visibleList);
  }
}
