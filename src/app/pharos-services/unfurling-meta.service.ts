import { Injectable } from '@angular/core';
import {Meta} from '@angular/platform-browser';

/**
 * Service designed to update meta tags for SEO and link unfurling.
 * todo: target details pages need to implement this
 */
@Injectable()
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
        this.metaService.updateTag({
                content: data.toolName
            },
            'property="og:description"'
        );
        this.metaService.updateTag({
                content: data.description
            },
            'name="twitter:description"'
        );
        this.metaService.updateTag({
                content: data.toolName
            },
            'property="og:title"'
        );
        this.metaService.updateTag({
                content: data.toolName
            },
            'name="twitter:title"'
        );
        /*this.metaService.addTags([{
                content: window.location.href + '/assets/' + this.intern.mugshot,
                property: 'og:image'
            }, {
                content: window.location.href + '/assets/' + this.intern.mugshot,
                name: 'twitter:image'
            }],
            true
        );*/
    }
}
