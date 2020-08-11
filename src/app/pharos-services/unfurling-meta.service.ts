import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Meta} from '@angular/platform-browser';

/**
 * Service designed to update meta tags for SEO and link unfurling.
 */
@Injectable({
  providedIn: 'root'
})
export class UnfurlingMetaService {

  /**
   * Uses Angular Meta API to set meta elements
   * @param {Meta} metaService
   */
  constructor(private metaService: Meta, @Inject(DOCUMENT) private dom) {
  }

  /**
   * Update page tags with metadata
   * @param data
   */
  setMetaData(data: any): void {
    if (data.description) {
      this.metaService.updateTag({content: data.description}, `name='Description'`);
      this.metaService.updateTag({content: data.description}, `property='og:description'`);
      this.metaService.updateTag({content: data.description}, `name='twitter:description'`);
    }
    if (data.title) {
      this.metaService.updateTag({content: data.title}, `name='twitter:title'`);
      this.metaService.updateTag({content: data.title}, `property='og:title'`);
    }
  }

  destroyCanonicalURL() {
    this.dom.getElementById('canonicalURL').remove();
  }

  createCanonicalURL(path?: string[]) {
    let canURL = this.dom.URL;
    if (path) {
      canURL = [this.dom.location.origin, ...path].join('/');
      canURL = canURL.replace('http://','https://');
    }

    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('id','canonicalURL');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
}
