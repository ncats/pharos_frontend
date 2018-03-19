import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataListResolver} from './services/data-list.resolver';
import {DataListComponent} from "./data-list/data-list.component";

const ROUTES: Routes = [
  {
    path: 'targets',
    component: DataListComponent,
    resolve: {
      data: DataListResolver
    }
  },
  {
    path: '' +
    ':query',
    component: DataListComponent,
    resolve: {
      data: DataListResolver
    }
  }/*,
    {
    path: ':target',
    component: ToolDetailsComponent,
      resolve: {
          tool: ToolResolver
      }
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    DataListResolver
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
