import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { LoadingService } from './pharos-services/loading.service';
import { AppRoutingModule } from './app-routing.module';
import { PharosApiService } from './pharos-services/pharos-api.service';
import { ResponseParserService } from './pharos-services/response-parser.service';
import { EnvironmentVariablesService } from './pharos-services/environment-variables.service';
import { PathResolverService } from './pharos-services/path-resolver.service';
import { FacetRetrieverService } from './pharos-main/services/facet-retriever.service';
import { PharosDashboardComponent } from './pharos-dashboard/pharos-dashboard.component';
import {SuggestApiService} from './tools/search-component/suggest-api.service';
import {SharedModule} from './shared/shared.module';
import {ComponentLookupService} from './pharos-services/component-lookup.service';
import { DynamicPanelComponent } from './tools/dynamic-panel/dynamic-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiViewerComponent} from './tools/api-viewer/api-viewer.component';
import {DataTypesPanelComponent} from './pharos-dashboard/data-types-panel/data-types-panel.component';
import {AboutPanelComponent} from './pharos-dashboard/about-panel/about-panel.component';
import { NewsPanelComponent } from './pharos-dashboard/news-panel/news-panel.component';
import {environment} from '../environments/environment';
import { AboutPageComponent } from './about-page/about-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { ApiPageComponent } from './api-page/api-page.component';
import { StructureSearchPageComponent } from './structure-search-page/structure-search-page.component';
import { SequenceSearchPageComponent } from './sequence-search-page/sequence-search-page.component';
import {SketcherComponent} from './tools/marvin-sketcher/sketcher.component';
import {StructureSetterService} from './tools/marvin-sketcher/services/structure-setter.service';
import {MolConverterService} from './tools/marvin-sketcher/services/mol-converter.service';
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import { TrackScrollDirective } from './tools/sidenav-panel/directives/track-scroll.directive';
import { DynamicTablePanelComponent } from './tools/dynamic-table-panel/dynamic-table-panel.component';
import { LevelSummaryComponent } from './tools/level-summary/level-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    PharosDashboardComponent,
    DynamicPanelComponent,
    ApiViewerComponent,
    DataTypesPanelComponent,
    AboutPanelComponent,
    NewsPanelComponent,
    AboutPageComponent,
    FaqPageComponent,
    ApiPageComponent,
    SketcherComponent,
    StructureSearchPageComponent,
    SequenceSearchPageComponent,
    TrackScrollDirective,
    DynamicTablePanelComponent,
    LevelSummaryComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AppRoutingModule
    // todo: might be used later
    // AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    PharosApiService,
    PathResolverService,
    ResponseParserService,
    LoadingService,
    EnvironmentVariablesService,
    FacetRetrieverService,
    SuggestApiService,
    ComponentLookupService,
    MolConverterService,
    StructureSetterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
