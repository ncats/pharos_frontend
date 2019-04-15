import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {KatexRenderService} from "./services/katex-render.service";
import * as katex from 'katex';

@Component({
  selector: 'pharos-equation-renderer',
  templateUrl: './equation-renderer.component.html',
  styleUrls: ['./equation-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [KatexRenderService]
})
export class EquationRendererComponent implements OnInit {
@ViewChild('equationHolder') element: ElementRef;
@Input() equation: string;

  constructor(
    private katexRenderService: KatexRenderService
  ) { }

  ngOnInit() {
    console.log(this);
    console.log(this.equation);
      katex.render(this.equation, this.element.nativeElement, {});

  //  this.element.nativeElement.innerHTML = this.katexRenderService.renderMathInText(this.equation, {});
  }

}
