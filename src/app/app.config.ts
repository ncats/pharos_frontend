import {APP_ID, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {NcatsHeaderModule} from './tools/ncats-header/ncats-header.module';
import {GraphQLModule} from './graphql.module';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TOKENS} from '../config/component-tokens';
import {FilterPanelComponent} from './pharos-main/data-list/filter-panel/filter-panel.component';
import {SelectedFacetListComponent} from './pharos-main/data-list/selected-facet-list/selected-facet-list.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            ServiceWorkerModule.register('ngsw-worker.js', {enabled: true}),
            AppRoutingModule,
            RouterModule,
            FlexLayoutModule,
            AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
            AngularFirestoreModule, // imports firebase/firestore, only needed for database features
            AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
            NcatsHeaderModule, GraphQLModule, MarkdownModule.forRoot({loader: HttpClient})
        ),
        {provide: APP_ID, useValue: 'pharos'},
        {provide: TOKENS.PHAROS_FACETS_COMPONENT, useValue: FilterPanelComponent},
        {provide: TOKENS.PHAROS_SELECTED_FACET_LIST_COMPONENT, useValue: SelectedFacetListComponent},
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
}
