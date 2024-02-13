import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchComponentModule} from '../search-component/search-component.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    SearchComponentModule
  ]
})
export class NcatsHeaderModule {
}
