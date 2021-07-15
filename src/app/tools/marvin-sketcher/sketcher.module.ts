import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SketcherComponent} from './sketcher.component';
import {MaterialModule} from '../../../assets/material/material.module';


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
        CommonModule,
        MaterialModule
    ]
})

export class SketcherModule { }
