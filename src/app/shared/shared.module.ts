import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from '../tools/search-component/search.component';
import {HighlightPipe} from '../tools/search-component/highlight.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    SearchComponent,
    HighlightPipe
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SearchComponent,
    HighlightPipe
  ]
})
export class SharedModule { }
