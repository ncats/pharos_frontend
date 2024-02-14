import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';
import {isPlatformServer} from '@angular/common';

@Injectable({providedIn: 'root'})
export class PharosPreloader implements PreloadingStrategy {
    constructor(@Inject(PLATFORM_ID) private platformID: any) {
    }

    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        if (isPlatformServer(this.platformID)) {
            return of(null);
        }
        if (route.data && route.data.preload) {
            return fn();
        }
        return of(null);
    }
}
