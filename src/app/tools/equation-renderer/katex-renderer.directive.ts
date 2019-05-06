import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {KatexRenderService} from './services/katex-render.service';

@Directive({
  selector: '[pharosKatexRenderer]'
})
export class KatexRendererDirective {

  @Output() onError = new EventEmitter<any>();

  constructor(private el: ElementRef,
              private katexRenderService: KatexRenderService) {
    this.katexRenderService.renderMathInElement(this.el.nativeElement, {});
  }
}
