import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiseaseListRoutingModule} from './disease-list-routing.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {TOKENS} from '../../../../config/component-tokens';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedListModule} from '../../../shared/shared-list.module';
import {DiseaseTableComponent} from '../../data-list/tables/disease-table/disease-table.component';

@NgModule({
  declarations: [
    DiseaseTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    CommonToolsModule,
    DiseaseListRoutingModule,
    SharedListModule
  ],
  providers: [
    DataListResolver,
    {provide: TOKENS.DISEASE_TABLE_COMPONENT, useValue: DiseaseTableComponent}
  ],
  entryComponents: [
    DiseaseTableComponent
  ],
  exports: [
    DiseaseTableComponent
  ]
})
export class DiseaseListModule { }
