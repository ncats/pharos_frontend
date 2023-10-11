import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FacetHistogramComponent} from "./facet-histogram/facet-histogram.component";
import {MaterialModule} from "../../../../assets/material/material.module";
import {FacetTableComponent} from "./facet-table/facet-table.component";
import {SharedModule} from "../../../shared/shared.module";
import {RangeSliderComponent} from "../../../tools/range-slider/range-slider.component";
import { FacetCardComponent } from './facet-card/facet-card.component';

@NgModule({
  declarations: [
    FacetHistogramComponent,
    FacetTableComponent,
    RangeSliderComponent,
    FacetCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    FacetHistogramComponent,
    FacetTableComponent,
    RangeSliderComponent,
    FacetCardComponent
  ]
})
export class FilterPanelModule { }
