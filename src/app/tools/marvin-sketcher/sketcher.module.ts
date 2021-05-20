import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SketcherComponent} from './sketcher.component';


@NgModule({
  declarations: [
    SketcherComponent
  ],
  exports: [
    SketcherComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule
  ]
})

export class SketcherModule { }
