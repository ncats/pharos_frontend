import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiPageComponent} from './api-page.component';
import {ApiViewerModule} from '../tools/api-viewer/api-viewer.module';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ApiPageComponent
  }
];

@NgModule({
  declarations: [
    ApiPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule.forRoot(),
    CommonModule,
    ApiViewerModule
  ],
  exports: [
    ApiPageComponent
    ]
})
export class ApiPageModule { }
