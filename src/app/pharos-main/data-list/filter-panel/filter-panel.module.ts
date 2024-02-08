import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FacetHistogramComponent} from "./facet-histogram/facet-histogram.component";
import {MaterialModule} from "../../../../assets/material/material.module";
import {FacetTableComponent} from "./facet-table/facet-table.component";
import {SharedModule} from "../../../shared/shared.module";
import {RangeSliderComponent} from "../../../tools/range-slider/range-slider.component";
import { FacetCardComponent } from './facet-card/facet-card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FacetCardComponent,
    FacetTableComponent,
    FacetHistogramComponent,
    RangeSliderComponent
  ]
})
export class FilterPanelModule { }
