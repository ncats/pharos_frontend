import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnatomogramDetailsChooserComponent} from "..//anatamogram/anatomogram-details-chooser/anatomogram-details-chooser.component";
import {AnatomogramImageComponent} from "../anatamogram/anatomogram-image/anatomogram-image.component";
import {AnatomogramSpeciesChooserComponent} from "../anatamogram/anatomogram-species-chooser/anatomogram-species-chooser.component";
import {SharedModule} from "../../shared/shared.module";
import {AnatamogramComponent} from "../anatamogram/anatamogram.component";

@NgModule({
  declarations: [
    AnatomogramDetailsChooserComponent,
    AnatomogramImageComponent,
    AnatomogramSpeciesChooserComponent,
    AnatamogramComponent
  ],
  exports: [
    AnatomogramDetailsChooserComponent,
    AnatomogramImageComponent,
    AnatomogramSpeciesChooserComponent,
    AnatamogramComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AnatamogramModule { }
