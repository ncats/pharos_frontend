import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../../models/target";

@Component({
  selector: 'pharos-disease-sources-panel',
  templateUrl: './disease-sources-panel.component.html',
  styleUrls: ['./disease-sources-panel.component.css']
})
export class DiseaseSourcesPanelComponent implements OnInit {
@Input() target: Target;
  constructor() { }

  ngOnInit() {
  }

}
