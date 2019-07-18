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
    CommonModule,
    ApiViewerModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    ApiPageComponent
    ]
})
export class ApiPageModule { }
