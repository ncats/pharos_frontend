import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../assets/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import { NcatsFooterComponent} from './tools/ncats-footer/ncats-footer.component';
import { LoadingService } from './pharos-services/loading.service';
import { AppRoutingModule } from './app-routing.module';
import { PharosApiService } from './pharos-services/pharos-api.service';
import { ResponseParserService } from './pharos-services/response-parser.service';
import { EnvironmentVariablesService } from './pharos-services/environment-variables.service';
import { PathResolverService } from './pharos-services/path-resolver.service';
import { FacetRetrieverService } from './pharos-main/services/facet-retriever.service';
import { ToiDashboardComponent } from './pharos-dashboard/toi-dashboard/toi-dashboard.component';
import { ToiCardComponent } from './pharos-dashboard/toi-card/toi-card.component';
import { PharosDashboardComponent } from './pharos-dashboard/pharos-dashboard.component';
import { SearchCardComponent } from './pharos-dashboard/search-card/search-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ToiDashboardComponent,
    ToiCardComponent,
    PharosDashboardComponent,
    SearchCardComponent
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
    PharosApiService,
    PathResolverService,
    ResponseParserService,
    LoadingService,
    EnvironmentVariablesService,
    FacetRetrieverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
