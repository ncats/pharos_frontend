import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FaqPageComponent} from './faq-page.component';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: FaqPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule, SharedModule
  ]
})
export class FaqPageModule { }
