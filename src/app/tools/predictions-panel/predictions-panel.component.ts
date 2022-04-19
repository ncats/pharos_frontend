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
  predictionResult: {predictions: any[], citation: any};

  constructor(public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.thing = this.data.targets || this.data.diseases || this.data.ligands;
        this.predictionResult = this.thing.predictions;
      });
  }

  isObject(obj) {
    return typeof obj == 'object';
  }

  typeof(obj) {
    return typeof obj;
  }

  valueAscOrder(anything) {
    return 1;
  }
}
