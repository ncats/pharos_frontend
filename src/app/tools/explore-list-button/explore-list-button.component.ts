import {Component, Input, OnInit} from '@angular/core';

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

  ngOnInit(): void {
  }

  getTooltip(){
    let listName = this.path.replace("/","").toLowerCase().slice(0,this.path.length-2);
    const listTitle = listName.charAt(0).toUpperCase() + listName.slice(1);
    return `Opens the ${listTitle} List with this set of ${listName}s`;
  }
}
