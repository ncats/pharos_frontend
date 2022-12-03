import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-prediction-details-card',
  templateUrl: './prediction-details-card.component.html',
  styleUrls: ['./prediction-details-card.component.scss']
})
export class PredictionDetailsCardComponent implements OnInit {
  @Input() prediction: any;

  constructor() { }

  ngOnInit(): void {
  }

  isObject(obj) {
    return typeof obj == 'object';
  }

  typeof(obj) {
    return typeof obj;
  }
  formatConfidence(val) {
    return parseFloat(val).toPrecision(2);
  }

  hasStructure(prediction) {
    if (prediction.value.hasRepresentation && prediction.value.hasRepresentation.name === 'smiles') {
      return true;
    }
    return false;
  }

  identifiers(prediction): any[] {
    if (prediction.value.identifier) {
      if (Array.isArray(prediction.value.identifier)) {
        return prediction.value.identifier;
      }
      return [prediction.value.identifier];
    }
    return [];
  }
}
