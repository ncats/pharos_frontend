import {Component, Input, OnInit} from '@angular/core';
import {Value} from '../../models/value';
import {Term} from '../../models/term';

/**Component to iterate over and display a provided list of Term objects */
@Component({
  selector: 'pharos-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  /** list of terms to be displayed   */
  @Input() list: Term[];
  /**Label for the term group */
@Input() label: string;
/** object array that holds transformed term object.
 * Todo: this will likely be changed as more term complexity is added
 */
data: any[] = [];

  /**
   * No dependencies needed
   */
  constructor() { }

  /**
   * If list exists, maps the list of Term ofjects to a basic term:link pair to display
   * todo: will be expanded with router and external link templates
   * @returns void
   */
  ngOnInit(): void {
    if (this.list) {
      this.list.forEach(prop => this.data.push({term: prop.term, href: prop.href}));
    }
  }

}
