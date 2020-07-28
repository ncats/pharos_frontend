import { Injectable } from '@angular/core';
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
    constructor( private metaService: Meta) {
    }

  /**
   * Update page tags with metadata
   * @param data
   */
    setMetaData(data: any): void {
      this.metaService.updateTag({ content: data.description }, `name='Description'`);
      this.metaService.updateTag({ content: data.description }, `property='og:description'`);
      this.metaService.updateTag({ content: data.description }, `name='twitter:description'`);
      this.metaService.updateTag({ content: data.title }, `name='twitter:title'`);
      this.metaService.updateTag({ content: data.title }, `property='og:title'`);
    }
}
