import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LigandListRoutingModule} from './ligand-list-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {TOKENS} from '../../../../config/component-tokens';
import {DataListResolver} from '../../resolvers/data-list.resolver';
import {SharedListModule} from '../../../shared/shared-list.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {LigandTableComponent} from '../../data-list/tables/ligand-table/ligand-table.component';
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';

@NgModule({
  declarations: [
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
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent}
  ],
  exports: [
    LigandTableComponent
  ]
})
export class LigandListModule {
}
