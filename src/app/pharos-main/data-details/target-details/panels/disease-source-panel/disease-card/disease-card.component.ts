import {Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../../../models/disease";
import {DiseaseAssociation} from "../../../../../../models/disease-association";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'pharos-disease-card',
  templateUrl: './disease-card.component.html',
  styleUrls: ['./disease-card.component.scss']
})
export class DiseaseCardComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  @Input() disease: Disease;
  @Input() apiSources: any[];
  collapsed: boolean = true;

  nonDrugs: DiseaseAssociation[];
  drugs: DiseaseAssociation[];

  drugType = 'DrugCentral Indication';
  isSmallScreen = false;

  ngOnInit(): void {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    this.nonDrugs = this.disease.associations.filter(assoc => {
      return assoc.type != this.drugType;
    });
    this.drugs = this.disease.associations.filter(assoc => {
      return assoc.type == this.drugType;
    });
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
