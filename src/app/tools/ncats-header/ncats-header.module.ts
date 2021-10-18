import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NcatsHeaderComponent} from './ncats-header.component';
import {MaterialModule} from '../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchComponentModule} from '../search-component/search-component.module';
import {RouterModule} from '@angular/router';
import {AlertComponent} from '../alert/alert.component';

@NgModule({
  declarations: [
    NcatsHeaderComponent,
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
    NcatsHeaderComponent,
    AlertComponent
  ]
})
export class NcatsHeaderModule {
}
