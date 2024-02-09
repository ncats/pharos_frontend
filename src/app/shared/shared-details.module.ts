import { NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {DataDetailsResolver} from '../pharos-main/resolvers/data-details.resolver';
import {CommonToolsModule} from '../tools/common-tools.module';


@NgModule({
  imports: [
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    DataDetailsResolver
  ],
    exports: [
        SharedModule
    ]
})
export class SharedDetailsModule { }
