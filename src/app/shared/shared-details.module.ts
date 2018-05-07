///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import { NgModule} from '@angular/core';
import {BreadcrumbComponent} from "../tools/breadcrumb/breadcrumb.component";
import {DataDetailsComponent} from "../pharos-main/data-details/data-details.component";
import {NcatsHeaderComponent} from "../tools/ncats-header/ncats-header.component";
import {PharosMainComponent} from "../pharos-main/pharos-main.component";
import {NcatsFooterComponent} from "../tools/ncats-footer/ncats-footer.component";
import {SharedModule} from "./shared.module";
import {DataDetailsResolver} from "../pharos-main/services/data-details.resolver";


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DataDetailsComponent
  ],
  providers: [
    DataDetailsResolver
  ],
  exports: [
    DataDetailsComponent
  ]
})
export class SharedDetailsModule { }
