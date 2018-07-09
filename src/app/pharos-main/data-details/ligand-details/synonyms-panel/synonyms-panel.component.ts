import { Component, OnInit } from '@angular/core';
import {EnvironmentVariablesService} from "../../../../pharos-services/environment-variables.service";
import {StructureViewPanelComponent} from "../structure-view-panel/structure-view-panel.component";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";

@Component({
  selector: 'pharos-synonyms-panel',
  templateUrl: './synonyms-panel.component.html',
  styleUrls: ['./synonyms-panel.component.css']
})
export class SynonymsPanelComponent extends DynamicPanelComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {

  }
}
