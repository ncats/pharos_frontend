import {
  ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren
} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';

@Component({
  selector: 'pharos-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  activeElement = 'introduction';
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;

  constructor(private renderer: Renderer2,
              private changeDetector: ChangeDetectorRef,
              private scrollDispatcher: ScrollDispatcher) {
  }

  ngOnInit() {
    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      if (data) {
        let scrollTop: number = data.getElementRef().nativeElement.scrollTop + 100;
        if (scrollTop === 100) {
          this.activeElement = 'introduction';
          this.changeDetector.detectChanges();
        } else {
          this.scrollSections.forEach(section => {
            scrollTop = scrollTop - section.nativeElement.scrollHeight;
            if (scrollTop >= 0) {
              this.activeElement = section.nativeElement.nextSibling.id;
              this.changeDetector.detectChanges();
            }
          });
        }
      }
    });
  }

  public scroll(el: any): void {
    el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
