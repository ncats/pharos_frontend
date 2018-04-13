import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pharos-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.css']
})
export class SummaryPanelComponent implements OnInit {
  data: any = {};
  constructor() { }

  ngOnInit() {
  }

}
