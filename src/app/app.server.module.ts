import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {Routes, RouterModule, Router} from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';


const routes: Routes = [ { path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppShellComponent
   ],
})
export class AppServerModule {
  constructor(private router: Router) {
    this.router.resetConfig(routes);
  }
}
