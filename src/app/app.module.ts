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
import {ApiViewerComponent} from './tools/api-viewer/api-viewer.component';
import {DataTypesPanelComponent} from './pharos-dashboard/data-types-panel/data-types-panel.component';
import {AboutPanelComponent} from './pharos-dashboard/about-panel/about-panel.component';
import { NewsPanelComponent } from './pharos-dashboard/news-panel/news-panel.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AboutPageComponent } from './about-page/about-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { ApiPageComponent } from './api-page/api-page.component';
import { StructureSearchPageComponent } from './structure-search-page/structure-search-page.component';
import { SequenceSearchPageComponent } from './sequence-search-page/sequence-search-page.component';
import {SketcherComponent} from './tools/marvin-sketcher/sketcher.component';
import {StructureSetterService} from './tools/marvin-sketcher/services/structure-setter.service';
import {MolConverterService} from './tools/marvin-sketcher/services/mol-converter.service';


@NgModule({
  declarations: [
    AppComponent,
    PharosDashboardComponent,
    SearchCardComponent,
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
    SequenceSearchPageComponent
  ],
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
