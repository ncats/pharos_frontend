import {InjectionToken, NgModule} from '@angular/core';
import {DataListResolver} from './services/data-list.resolver';
import {RouterModule, Routes} from '@angular/router';
import {PharosMainComponent} from './pharos-main.component';
import {TargetTableComponent} from './data-list/target-table/target-table.component';
import {DataDetailsComponent} from './data-details/data-details.component';
import {DataDetailsResolver} from './services/data-details.resolver';
import {TargetDetailsComponent} from './data-details/target-details/target-details.component';
import {SummaryPanelComponent} from './data-details/target-details/panels/summary-panel/summary-panel.component';
import {TargetHeaderComponent} from './data-details/target-details/target-header/target-header.component';
import {SharedModule} from '../shared/shared.module';
import { DiseaseTableComponent} from './data-list/disease-table/disease-table.component';
import {
  DISEASE_DETAILS_COMPONENT,
  DISEASE_SOURCE_PANEL,
  DISEASE_TABLE_COMPONENT, EXPRESSION_PANEL, KNOWLEDGE_PANEL, ORTHOLOG_PANEL, REFERENCES_PANEL,
  SUMMARY_PANEL,
  TARGET_DETAILS_COMPONENT, TARGET_FACET_PANEL,
  TARGET_TABLE_COMPONENT, TOPIC_DETAILS_COMPONENT, TOPIC_TABLE_COMPONENT
} from '../../environments/environment.prod';
import {
  ReferencesPanelComponent
} from './data-details/target-details/panels/references-panel/references-panel.component';
import {KnowledgePanelComponent} from './data-details/target-details/panels/knowledge-panel/knowledge-panel.component';
import {ExpressionPanelComponent} from './data-details/target-details/panels/expression-panel/expression-panel.component';
import {DiseaseSourceComponent} from './data-details/target-details/panels/disease-source-panel/disease-source-panel.component';
import {OrthologPanelComponent} from './data-details/target-details/panels/ortholog-panel/ortholog-panel.component';
import {TargetFacetPanelComponent} from './data-details/target-details/panels/target-facet-panel/target-facet-panel.component';
import {
  ClassificationExplanationComponent
} from './data-details/target-details/panels/classification-explanation/classification-explanation.component';
import {DiseaseDetailsComponent} from "./data-details/disease-details/disease-details.component";
import {TopicTableComponent} from "./data-list/topic-table/topic-table.component";
import {TopicDetailsComponent} from "./data-details/topic-details/topic-details.component";

const pharosMainRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    resolve: {
      data: DataListResolver
    },
    // this reloads the component/resolver when the url changes from pagination or sort
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }, {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      data: DataDetailsResolver
    }
  }
];



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(pharosMainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataListResolver,
    DataDetailsResolver,
    // targets
    { provide: TARGET_TABLE_COMPONENT, useValue: TargetTableComponent },
    { provide: TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent },
    { provide: SUMMARY_PANEL, useValue: SummaryPanelComponent },
    { provide: KNOWLEDGE_PANEL, useValue: KnowledgePanelComponent },
    { provide: REFERENCES_PANEL, useValue: ReferencesPanelComponent },
    { provide: DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent },
    { provide: EXPRESSION_PANEL, useValue: ExpressionPanelComponent },
    { provide: ORTHOLOG_PANEL, useValue: OrthologPanelComponent },
    { provide: TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent },
    // diseases
    { provide: DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent },
    { provide: DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent },
    // topics
    { provide: TOPIC_TABLE_COMPONENT, useValue: TopicTableComponent },
    { provide: TOPIC_DETAILS_COMPONENT, useValue: TopicDetailsComponent },
  ],
  entryComponents: [
    TargetTableComponent,
    TargetDetailsComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    DiseaseSourceComponent,
    KnowledgePanelComponent,
    ExpressionPanelComponent,
    OrthologPanelComponent,
    TargetFacetPanelComponent,
    ClassificationExplanationComponent,
    DiseaseTableComponent,
    DiseaseDetailsComponent,
    TopicTableComponent,
    TopicDetailsComponent
  ],
  declarations: [
    TargetTableComponent,
    TargetDetailsComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    KnowledgePanelComponent,
    ExpressionPanelComponent,
    OrthologPanelComponent,
    TargetFacetPanelComponent,
    DiseaseSourceComponent,
    ClassificationExplanationComponent,
    DiseaseTableComponent,
    DiseaseDetailsComponent,
    TopicDetailsComponent
  ]
})
export class PharosMainRoutingModule { }

