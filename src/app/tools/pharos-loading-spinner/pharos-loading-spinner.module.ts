import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharosLoadingSpinnerComponent } from './pharos-loading-spinner/pharos-loading-spinner.component';



@NgModule({
  declarations: [PharosLoadingSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PharosLoadingSpinnerComponent
  ]
})
export class PharosLoadingSpinnerModule { }
