import { Injectable } from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Injectable()
export class UnfurlingMetaService {

    constructor( private metaService: Meta) {
    }


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
