import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {BrowseComponent} from '../../browse/browse-component/browse.component';
import {BrowseRoutingModule} from './browse-routing.module';
import {TOKENS} from '../../../../config/component-tokens';
import {TargetTableComponent} from '../../data-list/tables/target-table/target-table.component';
import {SharedListModule} from '../../../shared/shared-list.module';
import {TargetTableModule} from '../targets/target-list.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';

@NgModule({
  declarations: [
    BrowseComponent
  ],
    imports: [
        BrowseRoutingModule,
        CommonModule,
        SharedModule,
        SharedListModule,
        TargetTableModule,
        CommonToolsModule
    ],
  providers: [
    {provide: TOKENS.BROWSE_TABLE_COMPONENT, useValue: BrowseComponent}
  ]
})
export class BrowseModule {
}
