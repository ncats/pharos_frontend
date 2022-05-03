import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ApolloModule} from "apollo-angular";
import {SharedModule} from '../shared/shared.module';
import {UseCasesComponent} from './use-cases.component';
import {CommonToolsModule} from '../tools/common-tools.module';

const routes: Routes = [
  {
    path: '',
    component: UseCasesComponent
  }
];

@NgModule({
  declarations: [
    UseCasesComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule, SharedModule, CommonToolsModule
    ]
})
export class UseCasesModule { }
