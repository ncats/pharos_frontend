import {Component, Input, OnInit} from '@angular/core';
import {DiseaseAssociation} from '../../../../../../models/disease-association';
import {DynamicPanelBaseComponent} from '../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component';
import {MatCardSubtitle} from '@angular/material/card';
import {
  PropertyDisplayComponent
} from '../../../../../../tools/generic-table/components/property-display/property-display.component';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [
      CommonModule, MatCardSubtitle, PropertyDisplayComponent
  ],
  selector: 'pharos-disease-association',
  templateUrl: './disease-association.component.html',
  styleUrls: ['./disease-association.component.scss']
})
export class DiseaseAssociationComponent extends DynamicPanelBaseComponent implements OnInit {

  constructor() {
    super();
  }
  @Input() association: DiseaseAssociation;

  ngOnInit(): void {
  }
}
