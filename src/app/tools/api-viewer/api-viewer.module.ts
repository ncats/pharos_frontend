import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiViewerComponent} from './api-viewer.component';

@NgModule({
  declarations: [
    ApiViewerComponent
  ],
  exports: [
    ApiViewerComponent
  ],
  entryComponents: [
    ApiViewerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApiViewerModule { }
