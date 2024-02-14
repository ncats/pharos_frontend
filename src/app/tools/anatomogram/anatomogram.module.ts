import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AnatomogramHoverService} from './anatomogram-hover.service';

@NgModule({
  providers: [
    AnatomogramHoverService
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AnatomogramModule { }
