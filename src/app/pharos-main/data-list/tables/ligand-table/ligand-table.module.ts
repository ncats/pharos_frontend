import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {SharedModule} from '../../../../shared/shared.module';
import {LigandCardComponent} from '../../cards/ligand-card/ligand-card.component';
import {LigandTableComponent} from './ligand-table.component';
import {TOKENS} from '../../../../../config/component-tokens';
import {DataListResolver} from "../../data-list.resolver";
import {DataListComponent} from "../../data-list.component";

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
    LigandCardComponent,
    LigandTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    RouterModule.forChild(pharosListRoutes)
  ],
  providers: [
    DataListResolver,
    {provide: TOKENS.LIGAND_TABLE_COMPONENT, useValue: LigandTableComponent},
  ],
  entryComponents: [
    LigandCardComponent,
    LigandTableComponent
  ],
  exports: [
    LigandCardComponent,
    LigandTableComponent
  ]
})
export class LigandTableModule { }
