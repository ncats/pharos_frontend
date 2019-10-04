import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {KatexRenderService} from './services/katex-render.service';

/**
 * directive to render match equations with katex
 */
@Directive({
  selector: '[pharosKatexRenderer]'
})
/**
 * exported directive class
 */
export class KatexRendererDirective {
  /**
   * get element and render math using render service
   * @param el
   * @param katexRenderService
   */
  constructor(private el: ElementRef,
              private katexRenderService: KatexRenderService) {
    this.katexRenderService.renderMathInElement(this.el.nativeElement, {});
  }
}
