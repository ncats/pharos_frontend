import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PharosD3Service} from './pharos-d3.service';
import {PharosNodeService} from './pharos-node.service';
import {NcatsFdgModule} from '../../../../../../tools/force-directed-graph/ncats-fdg.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NcatsFdgModule
  ],
  providers: [
  PharosNodeService,
  PharosD3Service,

  ]
})
export class TopicDirectedGraphModule { }
