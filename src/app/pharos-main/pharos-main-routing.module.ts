import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TargetDetailsModule} from './data-details/target-details/target-details.module';
import {CommonToolsModule} from '../tools/common-tools.module';

import {PharosMainComponent} from './pharos-main.component';
import {DataDetailsResolver} from './data-details/data-details.resolver';

import {LoadingService} from '../pharos-services/loading.service';

import {SharedModule} from '../shared/shared.module';
import {SharedDetailsModule} from '../shared/shared-details.module';
import {SharedListModule} from '../shared/shared-list.module';
import {DiseaseTableModule} from './data-list/tables/disease-table/disease-table.module';
import {LigandDetailsModule} from './data-details/ligand-details/ligand-details.module';


import {DataDetailsComponent} from './data-details/data-details.component';
import {DiseaseDetailsModule} from "./data-details/disease-details/disease-details.module";
import {TopicTableModule} from "./data-list/tables/topic-table/topic-table.module";
import {TopicDetailsModule} from "./data-details/topic-details/topic-details.module";


const pharosMainRoutes: Routes = [
  {
    path: '',
    component: PharosMainComponent,
    loadChildren: () => import('./data-list/data-list.module').then(m => m.DataListModule)
  },
  {
    path: ':id',
    component: DataDetailsComponent,
    resolve: {
      pharosObject: DataDetailsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    TargetDetailsModule,
    SharedModule.forRoot(),
    CommonToolsModule,
    SharedListModule,
    DiseaseTableModule,
    SharedDetailsModule,
    LigandDetailsModule,
    DiseaseDetailsModule,
    TopicDetailsModule,
    TopicTableModule,
    RouterModule.forChild(pharosMainRoutes)

  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoadingService
  ],
  entryComponents: [
    PharosMainComponent


  ],
  declarations: [
    PharosMainComponent
  ]
})
export class PharosMainRoutingModule {
}

