import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StructureSearchPageComponent} from './structure-search-page.component';

const routes: Routes = [
  {
    path: '',
    component: StructureSearchPageComponent
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ]
})
export class StructureSearchPageModule { }
