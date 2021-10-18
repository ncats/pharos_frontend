import {Component, Input, OnInit} from '@angular/core';
import {DiseaseAssociation} from '../../../../../../models/disease-association';
import {DynamicPanelBaseComponent} from '../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component';

@Component({
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
