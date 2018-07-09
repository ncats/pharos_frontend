import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DynamicPanelComponent} from "../../../tools/dynamic-panel/dynamic-panel.component";

@Component({
  selector: 'pharos-disease-details',
  templateUrl: './disease-details.component.html',
  styleUrls: ['./disease-details.component.css']
})
export class DiseaseDetailsComponent extends DynamicPanelComponent implements OnInit{

  constructor() {
    super();
  }

  ngOnInit() {
  console.log(this);
  }
}
