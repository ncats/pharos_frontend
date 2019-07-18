import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
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
import {CommonToolsModule} from './tools/common-tools.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from '../assets/material/material.module';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserModule} from '@angular/platform-browser';
import {AppServerModule} from './app.server.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    FaqPageComponent,
    ApiPageComponent,
    StructureSearchPageComponent,
    SequenceSearchPageComponent,
    PageNotFoundComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    CommonToolsModule,
    MaterialModule,
    AuthModule,
    SharedModule.forRoot()
  ],
  providers: [
    PharosApiService,
    PathResolverService,
    FacetRetrieverService,
    SuggestApiService,
    MolConverterService,
    StructureSetterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
