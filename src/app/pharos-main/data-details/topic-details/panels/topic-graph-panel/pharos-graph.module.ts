import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphDataService, SmrtgraphCoreModule} from 'smrtgraph-core';
import {TopicGraphPanelComponent} from './topic-graph-panel.component';
import {NodeDetailsBoxComponent} from './node-details-box/node-details-box.component';
import {SearchComponentModule} from '../../../../../tools/search-component/search-component.module';
import {SearchComponent} from './node-details-box/search-component/search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../../shared/shared.module';
import {HighlightPipe} from './node-details-box/search-component/highlight.pipe';
import {TargetCardComponent} from '../../../../data-list/cards/target-card/target-card.component';
import {TargetTableModule} from '../../../../modules/targets/target-list.module';
import {LigandListModule} from '../../../../modules/ligands/ligand-list.module';
import {RouterModule} from '@angular/router';
import { TopicGraphFiltersComponent } from './topic-graph-filters/topic-graph-filters.component';

@NgModule({
  declarations: [
    TopicGraphPanelComponent,
    NodeDetailsBoxComponent,
    SearchComponent,
    HighlightPipe,
    TopicGraphFiltersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SmrtgraphCoreModule,
    TargetTableModule,
    LigandListModule
  ],
  exports: [
    TopicGraphPanelComponent
  ]
})
export class PharosGraphModule { }
