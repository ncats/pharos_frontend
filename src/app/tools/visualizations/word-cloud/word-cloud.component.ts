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
    console.log(this.width);
  }

  ngOnChanges() {
    this.changeDetectorRef.detectChanges();
  }

  rotateFunction(datum: any, index: number) : number {
    return 0;
    // return index % 2 == 0 ? 0 : -90;
  }

}
