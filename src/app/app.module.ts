import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../assets/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NcatsHeaderComponent} from './ncats-header/ncats-header.component';
import {NcatsFooterComponent} from './ncats-footer/ncats-footer.component';
import {LoadingService} from './services/loading.service';
import { DataListComponent } from './data-list/data-list.component';
import { DataDetailsComponent } from './data-details/data-details.component';
import {DataLoaderService} from "./services/data-loader.service";
import {AppRoutingModule} from "./app-routing.module";
import { IndexComponent } from './index/index.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { DataListVisualizationsComponent } from './data-list-visualizations/data-list-visualizations.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AppComponent,
    NcatsHeaderComponent,
    NcatsFooterComponent,
    DataListComponent,
    DataDetailsComponent,
    IndexComponent,
    FilterPanelComponent,
    DataListVisualizationsComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
    DataLoaderService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
