import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {SearchComponent} from '../../search/search-component/search.component';
import {SearchRoutingModule} from './search-routing.module';
import {TOKENS} from '../../../../config/component-tokens';
import {TargetTableComponent} from '../../data-list/tables/target-table/target-table.component';
import {SharedListModule} from '../../../shared/shared-list.module';
import {TargetTableModule} from '../targets/target-list.module';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {FacetTableModule} from '../../data-list/filter-panel/facet-table/facet-table.module';

@NgModule({
  declarations: [
    SearchComponent
  ],
    imports: [
        SearchRoutingModule,
        CommonModule,
        SharedModule,
        SharedListModule,
        TargetTableModule,
        CommonToolsModule,
        FacetTableModule
    ],
  providers: [
    {provide: TOKENS.BROWSE_TABLE_COMPONENT, useValue: SearchComponent}
  ]
})
export class SearchModule {
}
