import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {HighlightPipe} from './highlight.pipe';
import {SuggestApiService} from './suggest-api.service';
import {MaterialModule} from '../../../assets/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SearchComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    SuggestApiService
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchComponentModule { }
