///<reference path="../../../node_modules/@angular/router/src/router_module.d.ts"/>
import { NgModule} from '@angular/core';
import {DataDetailsComponent} from '../pharos-main/data-details/data-details.component';
import {SharedModule} from './shared.module';
import {DataDetailsResolver} from '../pharos-main/services/data-details.resolver';


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
    SharedModule,
    DataDetailsComponent

  ]
})
export class SharedDetailsModule { }
