import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {MatCard, MatCardModule} from '@angular/material/card';
import {ComponentHeaderComponent} from '../component-header/component-header.component';
import {PredictionSetComponent} from './prediction-set/prediction-set.component';
import {ScrollspyDirective} from '../sidenav-panel/directives/scrollspy.directive';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [
      CommonModule,
    MatCardModule,
    ComponentHeaderComponent,
    PredictionSetComponent, ScrollspyDirective
  ],
  selector: 'pharos-predictions-panel',
  templateUrl: './predictions-panel.component.html',
  styleUrls: ['./predictions-panel.component.scss']
})
export class PredictionsPanelComponent extends DynamicPanelComponent implements OnInit, OnChanges
{
  @Input() predictionResult: {predictions: any[], citation: any}[];
  isDev: boolean = !environment.production;

  constructor(public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.initialize();
      });
  }


  resultsSummary(set) {
    return `${set.predictions[0].name} (${set.predictions.length})`;
  }

  initialize(){
    if (!this.predictionResult) {
      this.loadingComplete();
      return;
    }
    if (this.hasData()) {
      this.showSection();
    } else {
      this.hideSection();
    }
    this.loadingComplete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.predictionResult && !changes.predictionResult.firstChange) {
      this.initialize();
    }
  }

  authorString(predictionSet) {
    return predictionSet.citation.author.map(p => p.name).join(', ');
  }

  hasData() {
    return this.predictionResult &&
      this.predictionResult[0]?.predictions &&
      this.predictionResult[0]?.predictions.length > 0;
  }

  valueAscOrder(anything) {
    return 1;
  }


}
