import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonToolsModule} from "../common-tools.module";
import {NodeDetailsBoxComponent} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/components/node-details-box/node-details-box.component";
import {GraphMenuComponent} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/components/graph-menu/graph-menu.component";
import {LinkVisualComponent} from "./fdg-core/graph-component/shared-components/link-visual/link-visual.component";
import {ForceDirectedGraphComponent} from "./fdg-core/force-directed-graph.component";
import {NodeVisualComponent} from "./fdg-core/graph-component/shared-components/node-visual/node-visual.component";
import {RangeSliderComponent} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/tools/range-slider/range-slider.component";
import {D3ColorLegendComponent} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/tools/d3-color-legend/d3-color-legend.component";

import {LinkService} from "./fdg-core/graph-component/services/event-tracking/link.service";
import {GraphDataService} from "./fdg-core/graph-component/services/graph-data.service";
import {NodeMenuControllerService} from "./fdg-core/graph-component/services/event-tracking/node-menu-controller.service";
import {HighlightPipe} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/tools/search-component/highlight.pipe";
import {SearchComponent} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/tools/search-component/search.component";
import {GraphClickDirective} from "./fdg-core/graph-component/directives/graph-click.directive";
import {ClickableLinkDirective} from "./fdg-core/graph-component/directives/clickable-link.directive";
import {ClickableNodeDirective} from "./fdg-core/graph-component/directives/clickable-node.directive";
import {DraggableDirective} from "./fdg-core/graph-component/directives/draggable.directive";
import {HoverableNodeDirective} from "./fdg-core/graph-component/directives/hoverable-node.directive";
import {HoverableLinkDirective} from "./fdg-core/graph-component/directives/hoverable-link.directive";
import {ZoomableDirective} from "./fdg-core/graph-component/directives/zoomable.directive";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    NodeVisualComponent,
    LinkVisualComponent,
    ForceDirectedGraphComponent,
    NodeDetailsBoxComponent,
    GraphMenuComponent,
    RangeSliderComponent,
    D3ColorLegendComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    HoverableLinkDirective,
    HoverableNodeDirective,
    DraggableDirective,
    ClickableNodeDirective,
    ClickableLinkDirective,
    GraphClickDirective,
    HighlightPipe,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    LinkService,
    GraphDataService,
    NodeMenuControllerService
  ],
  exports: [
    ForceDirectedGraphComponent,
    NodeDetailsBoxComponent,
    GraphMenuComponent,
    RangeSliderComponent,
    D3ColorLegendComponent
  ]
})
export class NcatsFdgModule { }
