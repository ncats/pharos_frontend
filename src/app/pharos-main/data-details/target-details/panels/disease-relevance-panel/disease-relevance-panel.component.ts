import {Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../models/target';

@Component({
  selector: 'pharos-disease-relevance-panel',
  templateUrl: './disease-relevance-panel.component.html',
  styleUrls: ['./disease-relevance-panel.component.css']
})
export class DiseaseRelevancePanelComponent implements OnInit {
  @Input() target: Target;
  width = 30;
  constructor() { }

  ngOnInit() {
    console.log(this);
 //   href: "http://localhost:9000/idg/api/v1/targets(88)/links"
 //   http://localhost:9000/idg/api/v1/targets/73/links(kind=ix.idg.models.Disease)
      }

}
