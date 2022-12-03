import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Component({
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

  citations() {
    if (Array.isArray(this.predictionResult)) {
      return this.predictionResult?.filter(f => f.citation)?.map(f => f.citation);
    }
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.initialize();
      });
  }

  get resultsSummary() {
    const counts = [];
    this.predictionResult?.forEach(set => {
      if (set.predictions?.length > 0) {
        counts.push(`${set.predictions[0].name} (${set.predictions.length})`);
      }
    });
    return counts.join(', ');
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
      this.predictionResult[0].predictions &&
      this.predictionResult[0].predictions.length > 0;
  }

  valueAscOrder(anything) {
    return 1;
  }
}
