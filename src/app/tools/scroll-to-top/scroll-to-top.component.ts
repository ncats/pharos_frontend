import {Component, HostListener, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

/**
 * Component that contains a ui button that appears after scrolling past the top menu, on click, it scrolls the user back
 * to the top of the page
 */
@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  selector: 'pharos-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {
  /**
   * fires to set the nav to be fixed
   */
  navIsFixed: boolean;


  /**
   * get document to watch for scrol levents
   * @param {Document} document
   */
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  /**
   * method that checks to see if the user has scrolled past a certain point. pinned to the window object
   * @returns void
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.pageYOffset > 100 || this.document.documentElement.scrollTop > 100 || this.document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset < 10
      || this.document.documentElement.scrollTop < 10
      || this.document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }

  /**
   * method that returns the user to the top position of the document
   */
  scrollToTop(): void {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

}
