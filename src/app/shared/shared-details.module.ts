///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import { NgModule} from '@angular/core';
import {DataDetailsComponent} from '../pharos-main/data-details/data-details.component';
import {SharedModule} from './shared.module';
import {DataDetailsResolver} from '../pharos-main/services/data-details.resolver';
import {SidenavPanelComponent} from "../tools/sidenav-panel/sidenav-panel.component";


@NgModule({
  imports: [
    SharedModule
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
    DataDetailsComponent,
    SidenavPanelComponent
  ]
})
export class SharedDetailsModule { }
