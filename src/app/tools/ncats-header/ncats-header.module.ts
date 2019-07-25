import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NcatsHeaderComponent} from './ncats-header.component';
import {MaterialModule} from '../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchComponentModule} from '../search-component/search-component.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NcatsHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    SearchComponentModule
  ],
  exports: [
  NcatsHeaderComponent
  ]
})
export class NcatsHeaderModule { }
