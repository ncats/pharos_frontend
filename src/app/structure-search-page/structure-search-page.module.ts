import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {StructureSearchPageComponent} from './structure-search-page.component';
import {SketcherModule} from '../tools/marvin-sketcher/sketcher.module';
import {CommonToolsModule} from '../tools/common-tools.module';

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
