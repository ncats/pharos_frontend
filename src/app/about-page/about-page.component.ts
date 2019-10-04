import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';
import {PharosProperty} from '../models/pharos-property';
import {SOURCES} from '../../config/data-sources';

/**
 * about page component
 */
@Component({
  selector: 'pharos-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  /**
   * default active element for menu highlighting, will be replaced on scroll
   * @type {string}
   */
  activeElement = 'introduction';

  /**
   *
   */
  @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;

  /**
   * fields to show in the sources table on the about page
   * @type {PharosProperty[]}
   */
  sourceFields: PharosProperty[] = [
    new PharosProperty({
      name: 'source',
      label: 'Source',
      sortable: true,
      sorted: 'asc'
    }),
    new PharosProperty({
      name: 'targetCount',
      label: 'Targets'
    //  sortable: true
    }),
    new PharosProperty({
      name: 'diseaseCount',
      label: 'Diseases'
     // sortable: true
    }),
    new PharosProperty({
      name: 'ligandCount',
      label: 'Ligands',
      // sortable: true
    }),
  ];

  /**
   * sources list from assets file
   */
  _sources: any;

  /**
   * set up change detection and scroll dispatching
   * @param {ChangeDetectorRef} changeDetector
   * @param {ScrollDispatcher} scrollDispatcher
   */
  constructor(
              private changeDetector: ChangeDetectorRef,
              private scrollDispatcher: ScrollDispatcher) {
    this._sources = SOURCES;
  }

  /**
   * watch scrool and change active section on sidenav
   * todo could be updated to use the injectable sidenav
   */
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

  /**
   * scroll to section
   * @param el
   */
  public scroll(el: any): void {
    el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  /**
   * check which section is active
   * @param {string} check
   * @returns {boolean}
   */
  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
