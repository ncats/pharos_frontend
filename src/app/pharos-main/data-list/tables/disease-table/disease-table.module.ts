import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TOKENS} from '../../../../../config/component-tokens';
import {SharedModule} from '../../../../shared/shared.module';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {DiseaseTableComponent} from './disease-table.component';
import {DataListResolver} from "../../data-list.resolver";
import {DataListComponent} from "../../data-list.component";
import {SharedListModule} from "../../../../shared/shared-list.module";

const pharosListRoutes: Routes = [
  {
    path: '',
    component: DataListComponent,
    resolve: {
      data: DataListResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  declarations: [
    DiseaseTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    SharedListModule,
    RouterModule.forChild(pharosListRoutes)
  ],
  providers: [
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent}
  ],
  entryComponents: [
    DiseaseTableComponent
  ],
  exports: [
    DiseaseTableComponent
  ]
})
export class DiseaseTableModule { }
