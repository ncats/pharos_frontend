import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ScriptLoadService {

  constructor(@Inject(PLATFORM_ID) private platformID: any,
              @Inject(DOCUMENT) private _document: Document) {
  }

  loadReactomeInteractingPathwaysScript() {
    if (isPlatformServer(this.platformID)) {
      return Promise.resolve();
    }
    const className = 'reactome-interacting-pathway-script';
    const existingScripts = this._document.head.getElementsByClassName(className);
    if (existingScripts.length) {
      return Promise.resolve();
    }
    const script = this._document.createElement('script');
    script.setAttribute('class', className);
    script.type = 'text/javascript';
    script.src = 'https://idg.reactome.org/wc/reactome-interactor-search.min.js';
    script.onerror = (err) => {
      console.log('Error loading Reactome Interactor widget');
      console.log(err);
    }
    this._document.head.appendChild(script);
    return new Promise((resolve) => {
      script.onload = resolve;
    });
  }

  loadReactomeScript() {
    if (isPlatformServer(this.platformID)) {
      return Promise.resolve();
    }
    const className = 'reactome-diagram-script';
    const existingScripts = this._document.head.getElementsByClassName(className)
    if (existingScripts.length) {
      return new Promise((resolve) => {
        this.resolveWhenReactomeIsReadyInternal(resolve);
      });
    } else {
      const script = this._document.createElement('script');
      script.setAttribute('class', className);
      script.type = 'text/javascript';
      script.src = 'https://idg.reactome.org/DiagramJs/diagram/diagram.nocache.js';
      script.onerror = (err) => {
        console.log('Error loading Reactome widget');
        console.log(err);
      }
      this._document.head.appendChild(script);
      return new Promise((resolve) => {
        script.onload = this.resolveWhenReactomeIsReady.bind({resolve, that: this});
      });
    }
  }

  resolveWhenReactomeIsReady() {
    // @ts-ignore
    this.that.resolveWhenReactomeIsReadyInternal(this.resolve);
  }

  resolveWhenReactomeIsReadyInternal(resolve) {
    // @ts-ignore
    if (window.Reactome) {
      resolve(true);
      return;
    }
    const intervalID = setInterval(() => {
      // @ts-ignore
      if (window.Reactome) {
        resolve(true);
        clearInterval(intervalID);
      }
    }, 150);
  }
}
