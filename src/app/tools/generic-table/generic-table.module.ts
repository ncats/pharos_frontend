import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenericTableComponent} from './generic-table.component';
import {MaterialModule} from '../../../assets/material/material.module';
import {PropertyDisplayComponent} from './components/property-display/property-display.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {PharosPaginatorModule} from "../pharos-paginator/pharos-paginator.module";

@NgModule({
  declarations: [
    GenericTableComponent,
    PropertyDisplayComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PharosPaginatorModule
  ],
  exports: [
    GenericTableComponent,
    PropertyDisplayComponent
  ]
})
export class GenericTableModule { }
