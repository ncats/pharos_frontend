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

  ngOnInit(): void {
  }

}
