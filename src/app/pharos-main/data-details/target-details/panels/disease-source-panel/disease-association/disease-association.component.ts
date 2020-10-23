import {Component, Input, OnInit} from '@angular/core';
import {DiseaseAssociation} from "../../../../../../models/disease-association";

@Component({
  selector: 'pharos-disease-association',
  templateUrl: './disease-association.component.html',
  styleUrls: ['./disease-association.component.scss']
})
export class DiseaseAssociationComponent implements OnInit {

  constructor() { }
  @Input() association: DiseaseAssociation;

  @Input() apiSources: any[];

  ngOnInit(): void {
  }

  getTooltip(label: string): string {
    if (this.apiSources) {
      const tooltip = this.apiSources.filter(source => source.field === label);
      if (tooltip.length) {
        return tooltip[0].description;
      } else {
        return null;
      }
    }
  }
}
