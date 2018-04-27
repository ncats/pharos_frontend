import {Component, Input, OnInit} from '@angular/core';
import {Value} from '../../models/value';
import {Term} from '../../models/term';

@Component({
  selector: 'pharos-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
@Input() list: Term[];
@Input() label: string;
data: any[] = [];
  constructor() { }

  ngOnInit() {
    console.log(this);
 //   this.label = Array.from(new Set(this.list.map(prop => prop.label)))[0];
    if(this.list) {
      this.list.forEach(prop => this.data.push({term: prop.term, href: prop.href}));
    }
  }

}
