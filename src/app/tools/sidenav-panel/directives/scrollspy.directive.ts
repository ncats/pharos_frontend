import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {
  AfterViewInit, Directive,
  ElementRef, EventEmitter, Inject,
  NgZone, OnDestroy, Output, PLATFORM_ID
} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

/**
 * directive to watch scroll location and track menu/jump to top button
 */
@Directive({
  selector: '[pharosScrollspy]'
})

/**
 * directive to watch scroll location and track menu/jump to top button
 */
export class ScrollspyDirective implements AfterViewInit, OnDestroy {

  /**
   * emitter for when scroll position reaches specific locations
   */
  @Output() public pharosScrollspy: EventEmitter<any> = new EventEmitter();

  /**
   * observes position of scroll
   */
  private _intersectionObserver?: IntersectionObserver;

  /**
   * subscription for scroll events
   */
  private _scrollSubscription?: Subscription;

  /**
   * root object to watch scrolling of
   */
  private root: any;

  /**
   * ratio of scroll to watch for
   */
  private prevRatio = 0.0;

  /**
   * grabs necessary dom components and sets root based on directive id
   * @param document
   * @param _element
   * @param _zone
   * @param platformId
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _element: ElementRef,
    private _zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  /**
   * registers intersection observers, and adds scroll listeners
   */
  public ngAfterViewInit() {
    this.root = this.document.getElementById('scrollspy-main');
    if (isPlatformBrowser(this.platformId)) {
      if (this.hasCompatibleBrowser()) {
        this.registerIntersectionObserver();
        if (this._intersectionObserver && this._element.nativeElement) {
          this._intersectionObserver.observe(<Element>(this._element.nativeElement));
        }
      } else {
        this.addScrollListeners();
      }
    }
  }

  /**
   * basically checks to see if it is microsoft edge
   */
  public hasCompatibleBrowser(): boolean {
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    const userAgent = window.navigator.userAgent;
    const matches = userAgent.match(/Edge\/(\d*)\./i);

    const isEdge = !!matches && matches.length > 1;
    const isEdgeVersion16OrBetter = isEdge && (!!matches && parseInt(matches[1], 10) > 15);

    return hasIntersectionObserver && (!isEdge || isEdgeVersion16OrBetter);
  }

  /**
   * remove listeners on destroy
   */
  public ngOnDestroy() {
    this.removeListeners();
  }

  /**
   * create new intersection observer to watch element for the specified ratio/threshold
   */
  private registerIntersectionObserver(): void {
    if (!!this._intersectionObserver) {
      return;
    }
    this._intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {
      root: this.root ? this.root.nativeElement : null,
      threshold: [.5, 1]
    });
  }

  /**
   * checks dom for intersection, calls function or unobserves.
   * removed unobserve for frequent scrolling
   * @param entries
   */
  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        if (entry.intersectionRatio > this.prevRatio) {
          this.load();
        }
        this.prevRatio = entry.intersectionRatio;
        if (this._intersectionObserver && this._element.nativeElement) {
          //   this._intersectionObserver.unobserve(<Element>(this._element.nativeElement));
        }
      }
    });
  }

  /**
   * checks to see if the element is intersecting the viewport
   * @param entry
   */
  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    // For Samsung native browser, IO has been partially implemented where by the
    // callback fires, but entry object is empty. We will check manually.
    if (entry && Object.keys(entry).length) {
      return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
    }
    return this.isVisible();
  }

  /**
   * emit scroll event, removes listeners, but not needed
   */
  private load(): void {
    //   this.removeListeners();
    this.pharosScrollspy.emit();
  }

  /**
   * add listeners to watch scroll
   */
  private addScrollListeners() {
    if (this.isVisible()) {
      this.load();
      return;
    }
    this._zone.runOutsideAngular(() => {
      this._scrollSubscription = fromEvent(window, 'scroll')
        .pipe(debounceTime(50))
        .subscribe(this.onScroll);
    });
  }

  /**
   * remove and unsubscribe from listeners
   */
  private removeListeners() {
    if (this._scrollSubscription) {
      this._scrollSubscription.unsubscribe();
    }

    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
  }

  /**
   * run load function outside of angular change detection
   */
  private onScroll = () => {
    if (this.isVisible()) {
      this._zone.run(() => this.load());
    }
  }

  /**
   * checks if element is visible
   */
  private isVisible() {
    const scrollPosition = this.getScrollPosition();
    const elementOffset = this._element.nativeElement.offsetTop;
    return elementOffset <= scrollPosition;
  }

  /**
   * gets position of screen measured by window offsets
   */
  private getScrollPosition() {
    // Getting screen size and scroll position for IE
    return (window.scrollY || window.pageYOffset)
      + (document.documentElement.clientHeight || document.body.clientHeight);
  }
}
