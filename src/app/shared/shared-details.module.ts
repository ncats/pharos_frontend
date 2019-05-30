import { NgModule} from '@angular/core';
import {DataDetailsComponent} from '../pharos-main/data-details/data-details.component';
import {SharedModule} from './shared.module';
import {DataDetailsResolver} from '../pharos-main/data-details/data-details.resolver';
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
    DataDetailsComponent,
    SidenavPanelComponent
  ],
  providers: [
    DataDetailsResolver
  ],
  exports: [
    SharedModule,
    AnatamogramModule,
    DataDetailsComponent,
    SidenavPanelComponent
  ]
})
export class SharedDetailsModule { }
