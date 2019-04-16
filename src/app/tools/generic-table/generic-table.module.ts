import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenericTableComponent} from "./generic-table.component";
import {MaterialModule} from "../../../assets/material/material.module";
import {PropertyDisplayComponent} from "./components/property-display/property-display.component";

@NgModule({
  declarations: [
    GenericTableComponent,
    PropertyDisplayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GenericTableComponent,
    PropertyDisplayComponent
  ]
})
export class GenericTableModule { }
