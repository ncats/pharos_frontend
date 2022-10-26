import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {Ligand} from '../../models/ligand';
import {Disease} from '../../models/disease';
import {Target} from '../../models/target';

@Component({
  selector: 'pharos-predictions-panel',
  templateUrl: './predictions-panel.component.html',
  styleUrls: ['./predictions-panel.component.scss']
})
export class PredictionsPanelComponent extends DynamicPanelComponent implements OnInit {

  thing: Target | Disease | Ligand;
  predictionResult: {predictions: any[], citation: any}[] = [];
  count = 0;
  constructor(public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  citations() {
    return this.predictionResult.map(p => p.citation);
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.thing = this.data.targets || this.data.diseases || this.data.ligands;
        this.predictionResult = this.thing.predictions;
        this.count = 0;
        this.predictionResult.forEach(set => {
          this.count += set.predictions.length;
        });
        if (this.hasData()) {
          this.showSection();
        } else {
          this.hideSection();
        }
        this.loadingComplete();
      });
  }

  authorString(predictionSet) {
    return predictionSet.citation.author.map(p => p.name).join(', ');
  }

  hasData() {
    return this.predictionResult &&
      this.predictionResult.length > 0 &&
      this.predictionResult[0].predictions &&
      this.predictionResult[0].predictions.length > 0;
  }

  valueAscOrder(anything) {
    return 1;
  }
}
