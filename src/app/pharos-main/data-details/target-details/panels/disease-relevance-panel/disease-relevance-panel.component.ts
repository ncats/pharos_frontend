import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../models/target';

@Component({
  selector: 'pharos-disease-relevance-panel',
  templateUrl: './disease-relevance-panel.component.html',
  styleUrls: ['./disease-relevance-panel.component.css']
})
export class DiseaseRelevancePanelComponent implements OnInit {
  @Input() target: Target;
  @Input() width: number = 30;
  @HostBinding('attr.fxFlex')
  flex = this.width;
  constructor() { }

  ngOnInit() {

 //   href: "http://localhost:9000/idg/api/v1/targets(88)/links"
 //   http://localhost:9000/idg/api/v1/targets/73/links(kind=ix.idg.models.Disease)
      }

}
