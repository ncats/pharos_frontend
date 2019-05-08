import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import SwaggerUI from 'swagger-ui';

/**
 * component to display api information usinge rswagger ui viewer
 */
@Component({
  selector: 'pharos-api-viewer',
  templateUrl: './api-viewer.component.html',
  styleUrls: ['./api-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApiViewerComponent implements AfterViewInit {

  /**
   * container that holds the swagger ui
   */
  @ViewChild('swagger') el: ElementRef;

  /**
   * no args constructor
   */
  constructor() {}

  /**
   * create swagger ui viewer
   */
  ngAfterViewInit() {
    const ui = SwaggerUI({
      url: './assets/pharos-api.json',
      domNode: this.el.nativeElement
    });
  }
}
