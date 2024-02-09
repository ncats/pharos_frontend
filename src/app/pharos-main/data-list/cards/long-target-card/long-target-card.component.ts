import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Target} from '../../../../models/target';
import {DynamicPanelBaseComponent} from '../../../../tools/dynamic-panel-base/dynamic-panel-base.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {IdgLevelIndicatorComponent} from '../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {
  HelpPanelTriggerComponent
} from '../../../../tools/help-panel/components/help-panel-trigger/help-panel-trigger.component';
import {GeneDetailsComponent} from './gene-details/gene-details.component';
import {KnowledgeMetricsComponent} from './knowledge-metrics/knowledge-metrics.component';
import {SequenceSimilarityDetailsComponent} from './sequence-similarity-details/sequence-similarity-details.component';
import {DiseaseAssociationDetailsComponent} from './disease-association-details/disease-association-details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LigandAssociationDetailsComponent} from './ligand-association-details/ligand-association-details.component';
import {InteractionDetailsComponent} from './interaction-details/interaction-details.component';
import {SimilarityDetailsComponent} from './similarity-details/similarity-details.component';
import {TargetPredictionDetailsComponent} from './target-prediction-details/target-prediction-details.component';
import {RadarChartComponent} from '../../../../tools/visualizations/radar-chart/radar-chart.component';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, MatCheckboxModule, IdgLevelIndicatorComponent, RouterModule,
    HelpPanelTriggerComponent, GeneDetailsComponent, KnowledgeMetricsComponent, SequenceSimilarityDetailsComponent,
    DiseaseAssociationDetailsComponent, MatButtonModule, MatIconModule, LigandAssociationDetailsComponent,
    InteractionDetailsComponent, SimilarityDetailsComponent, TargetPredictionDetailsComponent, RadarChartComponent, MatTooltip],
  selector: 'pharos-long-target-card',
  templateUrl: './long-target-card.component.html',
  styleUrls: ['./long-target-card.component.scss']
})

export class LongTargetCardComponent extends DynamicPanelBaseComponent implements OnInit {

  @Input() target?: Target;
  @Input() similarityTarget?: Target;
  @Input() selected: boolean;
  @Input() loggedIn: boolean;

  expanded: boolean = false;
  expandingDiseases: boolean = false;

  toggleDiseases(){
    this.expandingDiseases = true;
    this.expanded = !this.expanded;
  }
  @Output() selectionChanged = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  toggleSelection($event: any){
    this.selected = !this.selected;
    this.selectionChanged.emit(this.selected);
  }
}
