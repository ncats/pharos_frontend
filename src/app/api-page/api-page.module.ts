import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiHelpComponent, ApiPageComponent} from './api-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {CommonToolsModule} from "../tools/common-tools.module";

const routes: Routes = [
  {
    path: '',
    component: ApiPageComponent
  }
];

@NgModule({
  declarations: [
    ApiPageComponent,
    ApiHelpComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    CommonToolsModule
  ],
  exports: [
    ApiPageComponent,
    ApiHelpComponent
    ]
})
export class ApiPageModule { }
