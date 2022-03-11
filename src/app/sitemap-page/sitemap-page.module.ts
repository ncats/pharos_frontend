import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SitemapPageComponent} from './sitemap-page.component';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SitemapPageComponent
  }
];

@NgModule({
  declarations: [SitemapPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, SharedModule
  ]
})
export class SitemapPageModule { }
