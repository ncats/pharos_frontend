import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import SwaggerUI from 'swagger-ui';


/**
 * ui page holder for a swagger UI API documentation viewer
 */
@Component({
  selector: 'pharos-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.scss']
})


export class ApiPageComponent implements AfterViewInit {

  /**
   * container that holds the swagger ui
   */
  @ViewChild('swagger', {static: true}) el: ElementRef;

  /**
   * no args constructor
   */
  constructor() {
  }

  /**
   * create swagger ui viewer
   */
  ngAfterViewInit() {
    const ui = SwaggerUI({
      url: './assets/pharos-api.yaml',
      domNode: this.el.nativeElement
    });
  }
}
