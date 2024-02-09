import { NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {DataDetailsResolver} from '../pharos-main/resolvers/data-details.resolver';
import {SidenavPanelComponent} from '../tools/sidenav-panel/sidenav-panel.component';
import {CommonToolsModule} from '../tools/common-tools.module';


@NgModule({
  imports: [
    SharedModule,
    CommonToolsModule
  ],
    declarations: [
        SidenavPanelComponent
    ],
  providers: [
    DataDetailsResolver
  ],
    exports: [
        SharedModule,
        SidenavPanelComponent
    ]
})
export class SharedDetailsModule { }
