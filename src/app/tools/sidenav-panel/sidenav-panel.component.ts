import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, Optional, Output, QueryList, Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NavSectionsService} from "./services/nav-sections.service";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/scrolling";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ViewportScroller, DOCUMENT} from "@angular/common";

@Component({
  selector: 'pharos-sidenav-panel',
  templateUrl: './sidenav-panel.component.html',
  styleUrls: ['./sidenav-panel.component.scss']
})
export class SidenavPanelComponent implements OnInit {
  activeElement: string;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;
  @Output() readonly scrollElement: EventEmitter<any> = new EventEmitter<any>();
sections: any[] = [];
  showHeader = true;

  constructor(
       @Optional() @Inject(DOCUMENT) private document: Document,
              private router: Router,
              private route: ActivatedRoute,
              private viewportScroller: ViewportScroller,
              private renderer: Renderer2,
              private changeDetector: ChangeDetectorRef,
              private scrollDispatcher: ScrollDispatcher,
              private navSectionsService: NavSectionsService) {
  }

  ngOnInit() {
    this.navSectionsService.sections$.subscribe(res => {
      if(res && res.length) {
        this.sections = res;
        this.activeElement = this.sections[0].section;
      }
    });

      console.log(this);
    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      if (data) {
        console.log(data);
        let scrollTop: number = data.getElementRef().nativeElement.scrollTop + 100;
        if (scrollTop === 100) {
          this.activeElement = this.sections[0].section;
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
    this.scrollElement.emit(el)
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
