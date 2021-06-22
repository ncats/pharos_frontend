import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FacetTableComponent} from './facet-table.component';
import {MaterialModule} from '../../../../../assets/material/material.module';



@NgModule({
  declarations: [FacetTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FacetTableComponent
  ]
})
export class FacetTableModule { }
