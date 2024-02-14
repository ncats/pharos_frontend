import {APP_ID, enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';

if (environment.production) {
    enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
    bootstrapApplication(AppComponent, appConfig)
        .catch(err => console.log(err));
});
