import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuggestApiService} from './suggest-api.service';

import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
],
  providers: [
    SuggestApiService
  ]
})
export class SearchComponentModule { }
