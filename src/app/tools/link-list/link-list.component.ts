import {Component, Input, OnInit} from '@angular/core';
import {PharosProperty} from '../../models/pharos-property';

/**
 * Component to iterate over and display a provided list of Term objects
 */
@Component({
  selector: 'pharos-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  /**
   * Label for the term group
   */
  @Input() label: string;

  /** object array that holds transformed term object.
   * Todo: this will likely be changed as more term complexity is added
   */
  private _list: any[] = [];

  @Input()
  set list(values: PharosProperty[]) {
    this._list = [];
    if (values) {
      values.forEach(prop => {
        // todo - make link
        this._list.push(prop);
      });
    }
    // set the latest value for _data BehaviorSubject
    // this._list = value;
  }

  get list() {
    // get the latest value from _data BehaviorSubject
    return this._list;
  }


  /**
   * No dependencies needed
   */
  constructor() {
  }


  ngOnInit(): void {
  }

}
