import { NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {DataDetailsResolver} from '../pharos-main/resolvers/data-details.resolver';
import {SidenavPanelComponent} from '../tools/sidenav-panel/sidenav-panel.component';
import {AnatamogramModule} from '../tools/anatamogram/anatamogram.module';
import {CommonToolsModule} from '../tools/common-tools.module';


@NgModule({
  imports: [
    SharedModule,
    AnatamogramModule,
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
    AnatamogramModule,
    SidenavPanelComponent
  ]
})
export class SharedDetailsModule { }
