import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, Renderer2, ViewChild,
  ViewChildren
} from '@angular/core';
import {NavSectionsService} from "./services/nav-sections.service";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/scrolling";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";

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
      if(res) {
        this.sections = res;
        this.activeElement = this.sections[0].section;
      }
    });

      console.log(this);
    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      if (data) {
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
    console.log(el);
    console.log(document.getElementById(el));
    console.log(this.router);
    let navigationExtras: NavigationExtras = {
    //  relativeTo: this.route,
     // queryParams: { 'session_id': sessionId },
      fragment: el
    };

    // Navigate to the login page with extras
   // this.router.navigate(this.router.)
    this.router.navigate([], navigationExtras);
   // this.viewportScroller.scrollToAnchor(el);





    /*  console.log(el);
      console.log(this);
      this.scrollElement.emit(el);*/
    // el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
