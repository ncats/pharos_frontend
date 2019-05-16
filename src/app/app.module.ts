import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoadingService} from './pharos-services/loading.service';
import {AppRoutingModule} from './app-routing.module';
import {PharosApiService} from './pharos-services/pharos-api.service';
import {PathResolverService} from './pharos-services/path-resolver.service';
import {FacetRetrieverService} from './pharos-main/data-list/filter-panel/facet-retriever.service';
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {SuggestApiService} from './tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AboutPageComponent} from './about-page/about-page.component';
import {FaqPageComponent} from './faq-page/faq-page.component';
import {ApiPageComponent} from './api-page/api-page.component';
import {StructureSearchPageComponent} from './structure-search-page/structure-search-page.component';
import {SequenceSearchPageComponent} from './sequence-search-page/sequence-search-page.component';
import {StructureSetterService} from './tools/marvin-sketcher/services/structure-setter.service';
import {MolConverterService} from './tools/marvin-sketcher/services/mol-converter.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {CommonToolsModule} from "./tools/common-tools.module";

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    FaqPageComponent,
    ApiPageComponent,
    StructureSearchPageComponent,
    SequenceSearchPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AppRoutingModule,
    CommonToolsModule
    // todo: might be used later
    // AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    PharosApiService,
    PathResolverService,
    LoadingService,
    FacetRetrieverService,
    SuggestApiService,
    MolConverterService,
    StructureSetterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
