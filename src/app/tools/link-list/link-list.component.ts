import {Component, Input, OnInit} from '@angular/core';
import {Property} from '../../models/property';

@Component({
  selector: 'pharos-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
@Input() list: Property[];
  constructor() { }

  ngOnInit() {
  }

}
