import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ChangelogComponent} from './changelog.component';
import {MarkdownModule} from 'ngx-markdown';


const routes: Routes = [
  {
    path: '',
    component: ChangelogComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MarkdownModule
  ]
})
export class ChangelogModule { }
