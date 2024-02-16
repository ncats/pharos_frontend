import {APP_ID, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {
    provideRouter,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling, withPreloading, withRouterConfig
} from '@angular/router';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {provideAnimations} from '@angular/platform-browser/animations';
import {APP_ROUTES} from './routing/app.routes';
import {PharosPreloader} from './routing/pharos-preloader';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {createApollo} from './graphql.config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(APP_ROUTES,
            withInMemoryScrolling({scrollPositionRestoration: 'top', anchorScrolling: 'enabled'}),
            withEnabledBlockingInitialNavigation(),
            withRouterConfig({onSameUrlNavigation: 'reload'}),
            withPreloading(PharosPreloader)
        ),
        importProvidersFrom(
            ServiceWorkerModule.register('ngsw-worker.js', {enabled: true}),
            AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
            AngularFirestoreModule, // imports firebase/firestore, only needed for database features
            AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
            MarkdownModule.forRoot({loader: HttpClient}),
            ApolloModule
        ),
        {provide: APP_ID, useValue: 'pharos'},
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
        {provide: APOLLO_OPTIONS, useFactory: createApollo, deps: [HttpLink]},
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
};
