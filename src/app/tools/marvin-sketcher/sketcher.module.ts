import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SketcherComponent} from './sketcher.component';
import {MolConverterService} from './services/mol-converter.service';
import {StructureSetterService} from './services/structure-setter.service';


@NgModule({
  declarations: [
    SketcherComponent
  ],
  exports: [
    SketcherComponent
  ],
  providers: [
    MolConverterService,
    StructureSetterService
  ],
  imports: [
    CommonModule
  ]
})

export class SketcherModule { }
