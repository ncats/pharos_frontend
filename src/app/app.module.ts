import {Injectable, Injector, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthModule} from './auth/auth.module';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserModule} from '@angular/platform-browser';
import {NcatsHeaderModule} from './tools/ncats-header/ncats-header.module';
import {PharosLoadingSpinnerModule} from './tools/pharos-loading-spinner/pharos-loading-spinner.module';
import {PharosFooterComponent} from './tools/pharos-footer/pharos-footer.component';
import {ScrollToTopComponent} from './tools/scroll-to-top/scroll-to-top.component';
import {MaterialModule} from '../assets/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {PharosMainComponent} from './pharos-main/pharos-main.component';
import {PharosProfileService} from './auth/pharos-profile.service';

@NgModule({
  declarations: [
    AppComponent,
    PharosFooterComponent,
    ScrollToTopComponent
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AuthModule,
    NcatsHeaderModule,
    PharosLoadingSpinnerModule,
    GraphQLModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
