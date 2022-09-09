import {Component, Input, OnInit} from '@angular/core';
import {PharosProperty} from "../../../models/pharos-property";
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'pharos-prediction-set',
  templateUrl: './prediction-set.component.html',
  styleUrls: ['./prediction-set.component.scss']
})
export class PredictionSetComponent implements OnInit {
  @Input() predictionSet: {predictions: any[], citation: any};
  @Input() style = 'table';
  @Input() pageSizeInput;

  page = 0;

  constructor() { }

  ngOnInit(): void { }

  get filteredPredictions() {
    return this.sliceForPage(this.predictionSet.predictions);
  }
  get filteredPredictionProps() {
    return this.sliceForPage(this.predictionProps);
  }
  get pageSize() {
    return this.pageSizeInput || this.getStyle(this.predictionSet) === 'table' ? 5 : 10;
  }
  sliceForPage(array: any[]) {
    return array.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
  }

  predictionTypes(predictionSet) {
    const uniqueKeys = new Map<string, boolean>();
    predictionSet.predictions.forEach(p => uniqueKeys.set(p.name, true));
    return Array.from(uniqueKeys.keys());
  }

  getStyle(predictionSet) {
    return predictionSet.style || this.style; // default to table view
  }

  showCardStyle(predictionSet) {
    return this.getStyle(predictionSet) === 'card';
  }
  showTableStyle(predictionSet) {
    return this.getStyle(predictionSet) === 'table';
  }

  paginate(event){
    this.page = event.pageIndex;
  }

  getAlternateName() {
    if (this.predictionSet.predictions.find(f => f.value.alternateName)) {
      return [new PharosProperty({
        name: 'alternateName',
        label: 'Alternate Name',
        sortable: true
      })];
    }
    return [];
  }

  get fields() {
    return [
      new PharosProperty({
        name: 'name',
        label: this.predictionSet.predictions[0].name,
        sortable: true
      }),
      ...this.getAlternateName(),
      new PharosProperty({
        name: 'value',
        label: this.predictionSet.predictions[0].confidence.alternateName,
        sortable: true,
        sorted: 'desc'
      })];
  }
// { "@type": "Prediction", "name": "Predicted Cancer", "value": { "@context": "https://schema.org", "@type": "MedicalCondition", "name": "Carcinoma, Non-Small-Cell Lung", "alternateName": "MESH:D002289", "mondoid": [ "MONDO:0005233" ], "url": "/diseases/MONDO:0005233" }, "confidence": { "@context": "https://schema.org", "@type": "QuantitativeValue", "value": "0.85", "alternateName": "probability", "description": "Measure of the relevance of inhibiting a particular protein kinase for a specific cancer", "maxValue": 1, "minValue": 0 } }
  get predictionProps() {
    return this.predictionSet.predictions
      .map(f => {
      return {
        name: {term:f.value.name, internalLink: f.value.url},
        alternateName: {term:f.value.alternateName},
        value: {term: this.formatConfidence(f.confidence.value)}
      };
    })
      .sort((a: any, b: any) => {
        const field = this.sortField.active;
        const dir = this.sortField.direction;
        if (isNumeric(a[field].term)) {
          if (dir === 'asc') {
            return a[field].term - b[field].term;
          }
          return b[field].term - a[field].term;
        } else {
          if (dir === 'asc') {
            return a[field].term.localeCompare(b[field].term)
          }
          return b[field].term.localeCompare(a[field].term)
        }
      });
  }
  sortField = {active: 'value', direction: 'desc'};

  formatConfidence(val) {
    return parseFloat(val).toPrecision(2);
  }
// {active: 'value', direction: 'asc'}
// prediction-set.component.ts:90 {active: 'value', direction: 'desc'}
// prediction-set.component.ts:90 {active: 'alternateName', direction: 'asc'}

  changeSort(event) {
    this.sortField = event;
  }

  getFilteredPredictions(type: string): any[] {
    switch (type) {
      case 'targets':
        return this.predictionSet.predictions.filter(p => p.value['@type'] === 'Protein');
      case 'diseases':
        return this.predictionSet.predictions.filter(p => p.value['@type'] === 'MedicalCondition');
    }
  }

  listHasTargets() {
    return this.getFilteredPredictions('targets').length > 0;
  }
  listHasDiseases() {
    return this.getFilteredPredictions('diseases').length > 0;
  }
  getList(type: string) {
    const predictions = this.getFilteredPredictions(type);
    const links = predictions.filter(p => p.value.url).map(p => {
      const url = p.value.url;
      const pieces = url.split('/');
      return pieces[pieces.length - 1];
    });
    return links.join('|');
  }
}
