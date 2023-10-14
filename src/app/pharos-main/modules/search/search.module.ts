import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {SearchComponent} from '../../search/search-component/search.component';
import {SearchRoutingModule} from './search-routing.module';
import {TOKENS} from '../../../../config/component-tokens';
import {SharedListModule} from '../../../shared/shared-list.module';
import {TargetTableModule} from '../targets/target-list.module';
import {CommonToolsModule} from '../../../tools/common-tools.module'
import {FilterPanelModule} from "../../data-list/filter-panel/filter-panel.module";

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
      FilterPanelModule
    ],
  providers: [
    {provide: TOKENS.BROWSE_TABLE_COMPONENT, useValue: SearchComponent}
  ]
})
export class SearchModule {
}
