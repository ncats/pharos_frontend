import {InjectionToken, NgModule} from '@angular/core';
import {DataListResolver} from './services/data-list.resolver';
import {RouterModule, Routes} from '@angular/router';
import {PharosMainComponent} from './pharos-main.component';
import {TargetTableComponent} from "./data-list/target-table/target-table.component";
import {DataDetailsComponent} from "./data-details/data-details.component";
import {DataDetailsResolver} from "./services/data-details.resolver";
import {TargetDetailsComponent} from "./data-details/target-details/target-details.component";
import {TdarkViewerComponent} from "./data-details/target-details/idg-levels/tdark-viewer/tdark-viewer.component";
import {TbioViewerComponent} from "./data-details/target-details/idg-levels/tbio-viewer/tbio-viewer.component";
import {TchemViewerComponent} from "./data-details/target-details/idg-levels/tchem-viewer/tchem-viewer.component";
import {TclinViewerComponent} from "./data-details/target-details/idg-levels/tclin-viewer/tclin-viewer.component";
import {ReferencesPanelComponent} from "./data-details/target-details/panels/references-panel/references-panel.component";
import {SummaryPanelComponent} from "./data-details/target-details/panels/summary-panel/summary-panel.component";
import {TargetHeaderComponent} from "./data-details/target-details/target-header/target-header.component";
import {SharedModule} from "../shared/shared.module";
import {IdgLevelIndicatorComponent} from "../tools/idg-level-indicator/idg-level-indicator.component";
import { DiseaseTableComponent} from "./data-list/disease-table/disease-table.component";
import {
  DISEASE_TABLE_COMPONENT, TARGET_DETAILS_COMPONENT,
  TARGET_TABLE_COMPONENT, TBIO_DETAILS, TCHEM_DETAILS, TCLIN_DETAILS, TDARK_DETAILS
} from "../../environments/environment.prod";
import {DiseaseSourcesPanelComponent} from "./data-details/target-details/panels/disease-sources-panel/disease-sources-panel.component";
import {KnowledgePanelComponent} from "./data-details/target-details/panels/knowledge-panel/knowledge-panel.component";

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
    { provide: TARGET_TABLE_COMPONENT, useValue: TargetTableComponent },
    { provide: TARGET_DETAILS_COMPONENT, useValue: TargetDetailsComponent },
    { provide: DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent },
    { provide: TDARK_DETAILS, useValue: TdarkViewerComponent },
    { provide: TBIO_DETAILS, useValue: TbioViewerComponent },
    { provide: TCLIN_DETAILS, useValue: TclinViewerComponent },
    { provide: TCHEM_DETAILS, useValue: TchemViewerComponent },


  ],
  entryComponents: [
    TargetTableComponent,
    TargetDetailsComponent,
    TdarkViewerComponent,
    TbioViewerComponent,
    TchemViewerComponent,
    TclinViewerComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    DiseaseTableComponent
  ],
  declarations: [
    TargetTableComponent,
    TargetDetailsComponent,
    TdarkViewerComponent,
    TbioViewerComponent,
    TchemViewerComponent,
    TclinViewerComponent,
    ReferencesPanelComponent,
    SummaryPanelComponent,
    TargetHeaderComponent,
    DiseaseTableComponent,
    DiseaseSourcesPanelComponent,
    KnowledgePanelComponent
  ]
})
export class PharosMainRoutingModule { }

