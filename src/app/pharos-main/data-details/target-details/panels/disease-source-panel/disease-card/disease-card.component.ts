import {Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../../../models/disease";
import {DiseaseAssociation} from "../../../../../../models/disease-association";
import {BreakpointObserver} from "@angular/cdk/layout";
import {DynamicPanelBaseComponent} from "../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component";

@Component({
  selector: 'pharos-disease-card',
  templateUrl: './disease-card.component.html',
  styleUrls: ['./disease-card.component.scss']
})
export class DiseaseCardComponent extends DynamicPanelBaseComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

  @Input() disease: Disease;
  collapsed: boolean = true;

  drugType = 'DrugCentral Indication';
  isSmallScreen = false;

  ngOnInit(): void {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  }

  diseaseSourceString() {
    const max = this.isSmallScreen ? 1 : 3;
    let types = this.disease.associations.map(j => j.type);
    const uniqueTypes = [];
    for (let t of types) {
      if (!uniqueTypes.includes(t)) {
        uniqueTypes.push(t);
      }
    }
    let str = uniqueTypes.slice(0, max).join(', ');
    if (uniqueTypes.length > max) {
      str = `${str} and ${uniqueTypes.length - max} more`;
    }
    return str;
  }
}
