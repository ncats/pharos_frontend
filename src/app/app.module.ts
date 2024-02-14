import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NcatsHeaderModule} from './tools/ncats-header/ncats-header.module';
import {MaterialModule} from '../assets/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GraphQLModule} from './graphql.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MarkdownModule} from 'ngx-markdown';
import {ServiceWorkerModule} from '@angular/service-worker';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {TOKENS} from '../config/component-tokens';
import {SelectedFacetListComponent} from './pharos-main/data-list/selected-facet-list/selected-facet-list.component';
import {FilterPanelComponent} from './pharos-main/data-list/filter-panel/filter-panel.component';

@NgModule({
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: true}),
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule.withServerTransition({appId: 'pharos'}),
    AppRoutingModule,
    RouterModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    NcatsHeaderModule,
    GraphQLModule,
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient})
  ],
  providers: [
    {provide: TOKENS.PHAROS_FACETS_COMPONENT, useValue: FilterPanelComponent},
    {provide: TOKENS.PHAROS_SELECTED_FACET_LIST_COMPONENT, useValue: SelectedFacetListComponent},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
