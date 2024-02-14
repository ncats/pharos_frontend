import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UseCasesComponent} from './use-cases.component';

const routes: Routes = [
  {
    path: '',
    component: UseCasesComponent
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class UseCasesModule { }
