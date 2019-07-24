import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SmrtgraphCoreModule} from 'smrtgraph-core';
import {TopicGraphPanelComponent} from './topic-graph-panel.component';

@NgModule({
  declarations: [
    TopicGraphPanelComponent
  ],
  imports: [
    CommonModule,
    SmrtgraphCoreModule
  ],
  exports: [
    TopicGraphPanelComponent
  ]
})
export class PharosGraphModule { }
