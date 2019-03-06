import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[pharosTrackScroll]',
})

export class TrackScrollDirective {
  @Input() public spiedTags = [];
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string;

  constructor(private _el: ElementRef) {
    console.log('sdgsfsfsfsghdjgfvbm');
    console.log(this._el);
  }

 // @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    console.log(event);
    console.log(this._el);
    let currentSection: string;
    const children = this._el.nativeElement.children;
    const scrollTop = event.target.scrollTop;
    const parentOffset = event.target.offsetTop;
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
        if ((element.offsetTop - parentOffset) <= scrollTop) {
          currentSection = element.id;
        }
      }
    }
    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }

}
