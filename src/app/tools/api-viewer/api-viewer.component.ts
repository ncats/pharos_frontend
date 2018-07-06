import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'pharos-api-viewer',
  templateUrl: './api-viewer.component.html',
  styleUrls: ['./api-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApiViewerComponent implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const ui = SwaggerUI({
      url: './assets/pharos-api.json',
      domNode: this.el.nativeElement.querySelector('.swagger-container'),
      docExpansion: 'list'
/*      presets: [
        SwaggerUI.presets.apis

      ],
      plugins: [
        SwaggerUI.plugins.DownloadUrl
      ]*/
    });
  }
}
