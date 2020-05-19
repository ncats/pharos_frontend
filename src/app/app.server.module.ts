import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {RouterModule, Router} from '@angular/router';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {ROUTES} from "./app-routing.module";
import {AppShellComponent} from "./app-shell/app-shell.component";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule,
    RouterModule.forRoot(ROUTES, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 120]
    }),
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppShellComponent
   ],
})
export class AppServerModule {
  constructor(private router: Router) {
    this.router.resetConfig(ROUTES);
  }
}
