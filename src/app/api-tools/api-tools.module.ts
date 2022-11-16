import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolboxComponent } from './toolbox/toolbox.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {SearchComponentModule} from "../tools/search-component/search-component.module";
import {CommonToolsModule} from "../tools/common-tools.module";


const routes: Routes = [
  {
    path: '',
    component: ToolboxComponent
  }
];


@NgModule({
  declarations: [
    ToolboxComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        SearchComponentModule,
        CommonToolsModule
    ]
})
export class ApiToolsModule { }
