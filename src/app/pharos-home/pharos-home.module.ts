import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PharosHomeComponent} from './pharos-home.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {CommonToolsModule} from '../tools/common-tools.module';

const pharosHomeRoutes: Routes = [
  {
    path: '',
    component: PharosHomeComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommonToolsModule,
    RouterModule.forChild(pharosHomeRoutes)
  ]
})
export class PharosHomeModule { }
