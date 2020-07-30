import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SequenceSearchPageComponent} from "./sequence-search-page.component";
import {SharedModule} from "../shared/shared.module";


const routes: Routes = [
  {
    path: '',
    component: SequenceSearchPageComponent
  }
];

@NgModule({
  declarations: [SequenceSearchPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, SharedModule
  ]
})
export class SequenceSearchModule { }
