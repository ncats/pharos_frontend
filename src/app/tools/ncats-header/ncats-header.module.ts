import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchComponentModule} from '../search-component/search-component.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SearchComponentModule
]
})
export class NcatsHeaderModule {
}
