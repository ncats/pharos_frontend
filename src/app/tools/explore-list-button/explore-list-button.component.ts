import {Component, Input, OnInit} from '@angular/core';
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'pharos-explore-list-button',
  templateUrl: './explore-list-button.component.html',
  styleUrls: ['./explore-list-button.component.scss']
})
export class ExploreListButtonComponent implements OnInit {

  constructor() { }

  @Input() path: string;
  @Input() queryParams: any;
  @Input() buttonText: string;
  @Input() facetName: string;

  ngOnInit(): void {
  }

  getTooltip(){
    let listName = this.path.replace("/","").toLowerCase().slice(0,this.path.length-2);
    const listTitle =  new TitleCasePipe().transform(listName);
    if(this.facetName) {
      return `Find ${listTitle}s with an overlapping set of ${this.facetName}`;
    }
    return `Opens the ${listTitle} List with this set of ${listName}s`;
  }
}
