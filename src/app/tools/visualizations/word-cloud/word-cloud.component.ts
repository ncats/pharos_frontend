import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  Input,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import {NcatsHeaderComponent} from "../../ncats-header/ncats-header.component";

@Component({
  selector: 'pharos-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('wordcloudTooltip', {static: true}) tooltip: ElementRef;
  @ViewChild('wordcloud', {static: true}) cloudRef: ElementRef;
  @Input() data;
  width = 500;
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {  }

  ngAfterViewInit() {
    this.setSize();
  }

  setSize() {
    const boundingWidth = this.cloudRef.nativeElement.getBoundingClientRect().width;
    if (boundingWidth > 600) {
      this.width = boundingWidth - 375;
    } else {
      this.width = boundingWidth * .70;
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges() {
    this.changeDetectorRef.detectChanges();
  }

  rotateFunction(datum: any, index: number) : number {
    return 0;
    // return index % 2 == 0 ? 0 : -90;
  }

  mouseOver(event: any) {
    const el = this.tooltip.nativeElement;

    el.innerHTML = `<div class="tooltip">
              <span class="tooltip-label">Word</span>:&nbsp; ${event.word.text}<br>
              <span class="tooltip-label">count</span>:&nbsp;${event.word.count}<br>
              <span class="tooltip-label">p-value</span>:&nbsp;${event.word.pValue}<br>
              </div>`;
    el.style['background-color'] = 'white';
    el.style.display = 'unset';
    el.style.width = '200px';
    el.style.opacity = 0.9;
    const top = parseInt(event.event.layerY) + 5;
    const left = parseInt(event.event.layerX) + 5;
    el.style.top = top + 'px';
    el.style.left = left + 'px';
  }
  mouseOut(event: any) {

      const el = this.tooltip.nativeElement;
      el.style.opacity = 0;
      el.style.display = 'none';
  }
}
