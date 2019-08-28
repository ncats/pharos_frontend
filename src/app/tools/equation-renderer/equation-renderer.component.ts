import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {KatexRenderService} from './services/katex-render.service';
import * as katex from 'katex';

/**
 * component to render kates directives
 */
@Component({
  selector: 'pharos-equation-renderer',
  templateUrl: './equation-renderer.component.html',
  styleUrls: ['./equation-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [KatexRenderService]
})
/**
 * exported equation rendering component
 */
export class EquationRendererComponent implements OnInit {
  /**
   * element that contains an equation
   */
  @ViewChild('equationHolder', {static: true}) element: ElementRef;
  /**
   * equation text string input
   */
  @Input() equation: string;

  /**
   * todo: the rendering service is currently not used - may need to be reassessed
   * @param katexRenderService
   */
  constructor(
    private katexRenderService: KatexRenderService
  ) { }

  /**
   * render equation using katex instead of service.
   */
  ngOnInit() {
      katex.render(this.equation, this.element.nativeElement, {});

  //  this.element.nativeElement.innerHTML = this.katexRenderService.renderMathInText(this.equation, {});
  }

}
