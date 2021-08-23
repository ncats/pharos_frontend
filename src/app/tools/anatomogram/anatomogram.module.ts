import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnatomogramImageComponent} from './/anatomogram-image/anatomogram-image.component';
import {SharedModule} from '../../shared/shared.module';
import {AnatomogramComponent} from './anatomogram.component';
import {AnatomogramHoverService} from './anatomogram-hover.service';
import {MaterialModule} from '../../../assets/material/material.module';

@NgModule({
  declarations: [
    AnatomogramImageComponent,
    AnatomogramComponent
  ],
  exports: [
    AnatomogramImageComponent,
    AnatomogramComponent
  ],
  providers: [
    AnatomogramHoverService
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AnatomogramModule { }
