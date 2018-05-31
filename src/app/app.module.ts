import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoadingService } from './pharos-services/loading.service';
import { AppRoutingModule } from './app-routing.module';
import { PharosApiService } from './pharos-services/pharos-api.service';
import { ResponseParserService } from './pharos-services/response-parser.service';
import { EnvironmentVariablesService } from './pharos-services/environment-variables.service';
import { PathResolverService } from './pharos-services/path-resolver.service';
import { FacetRetrieverService } from './pharos-main/services/facet-retriever.service';
import { PharosDashboardComponent } from './pharos-dashboard/pharos-dashboard.component';
import { SearchCardComponent } from './pharos-dashboard/search-card/search-card.component';
import {SuggestApiService} from './tools/search-component/suggest-api.service';
import {SharedModule} from './shared/shared.module';
import {ComponentLookupService} from './pharos-services/component-lookup.service';
import { DynamicPanelComponent } from './tools/dynamic-panel/dynamic-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BarChartComponent } from './tools/visualizations/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PharosDashboardComponent,
    SearchCardComponent,
    DynamicPanelComponent

  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [
    PharosApiService,
    PathResolverService,
    ResponseParserService,
    LoadingService,
    EnvironmentVariablesService,
    FacetRetrieverService,
    SuggestApiService,
    ComponentLookupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
