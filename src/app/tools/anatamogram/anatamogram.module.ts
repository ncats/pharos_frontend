import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnatomogramImageComponent} from "../anatamogram/anatomogram-image/anatomogram-image.component";
import {SharedModule} from "../../shared/shared.module";
import {AnatamogramComponent} from "../anatamogram/anatamogram.component";
import {AnatamogramHoverService} from "./anatamogram-hover.service";

@NgModule({
  declarations: [
    AnatomogramImageComponent,
    AnatamogramComponent
  ],
  exports: [
    AnatomogramImageComponent,
    AnatamogramComponent
  ],
  providers: [
    AnatamogramHoverService
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AnatamogramModule { }
