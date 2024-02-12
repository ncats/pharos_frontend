import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuggestApiService} from './suggest-api.service';
import {MaterialModule} from '../../../assets/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    SuggestApiService
  ]
})
export class SearchComponentModule { }
