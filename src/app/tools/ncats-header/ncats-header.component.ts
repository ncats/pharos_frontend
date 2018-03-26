import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ncats-header',
  templateUrl: './ncats-header.component.html',
  styleUrls: ['./ncats-header.component.css']
})
export class NcatsHeaderComponent implements OnInit {
 title: string ="Innovative Drugs";

  constructor() { }

  ngOnInit() {
  }

}
