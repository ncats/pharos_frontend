import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnatomogramImageComponent} from "../anatamogram/anatomogram-image/anatomogram-image.component";
import {SharedModule} from "../../shared/shared.module";
import {AnatamogramComponent} from "../anatamogram/anatamogram.component";

@NgModule({
  declarations: [
    AnatomogramImageComponent,
    AnatamogramComponent
  ],
  exports: [
    AnatomogramImageComponent,
    AnatamogramComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AnatamogramModule { }
