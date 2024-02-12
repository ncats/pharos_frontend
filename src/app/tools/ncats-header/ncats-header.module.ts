import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchComponentModule} from '../search-component/search-component.module';
import {RouterModule} from '@angular/router';
import {AlertComponent} from '../alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    SearchComponentModule
  ],
  exports: [
    AlertComponent
  ]
})
export class NcatsHeaderModule {
}
