import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LigandListRoutingModule} from './ligand-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {LigandCardComponent} from '../../data-list/cards/ligand-card/ligand-card.component';
import {TOKENS} from '../../../../config/component-tokens';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {SharedListModule} from '../../../shared/shared-list.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {LigandTableComponent} from '../../data-list/tables/ligand-table/ligand-table.component';

@NgModule({
  declarations: [
    LigandCardComponent,
    LigandTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LigandListRoutingModule,
    SharedListModule,
    CommonToolsModule
  ],
  providers: [
    DataListResolver,
    {provide: TOKENS.LIGAND_TABLE_COMPONENT, useValue: LigandTableComponent},
  ],
  exports: [
    LigandCardComponent,
    LigandTableComponent
  ]
})
export class LigandListModule {
}
