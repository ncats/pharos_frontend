import {forwardRef, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from '../tools/search-component/search.component';
import {HighlightPipe} from '../tools/search-component/highlight.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from "@angular/router";
import {ScrollToTopComponent} from "../tools/scroll-to-top/scroll-to-top.component";
import {IdgLevelIndicatorComponent} from "../tools/idg-level-indicator/idg-level-indicator.component";
import {CustomContentDirective} from "../tools/custom-content.directive";
import {ComponentInjectorService} from "../pharos-services/component-injector.service";
import {ComponentLookupService} from "../pharos-services/component-lookup.service";
import {GenericTableComponent} from "../tools/generic-table/generic-table.component";
import {TermDisplayComponent} from "../tools/term-display/term-display.component";

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
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    IdgLevelIndicatorComponent,
    GenericTableComponent,
    TermDisplayComponent
  ],
  providers: [
    ComponentLookupService,
    ComponentInjectorService
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SearchComponent,
    HighlightPipe,
    ScrollToTopComponent,
    CustomContentDirective,
    IdgLevelIndicatorComponent,
    GenericTableComponent,
    TermDisplayComponent
  ]
})
export class SharedModule { }
