import {
  ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren
} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';
import {TableData} from '../models/table-data';
import {Property} from '../models/property';
import {SOURCES} from '../../assets/data-sources';

@Component({
  selector: 'pharos-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  activeElement = 'introduction';
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;

  sourceFields: TableData[] = [
    new TableData({
      name: 'source',
      label: 'Source',
      sortable: true,
      sorted: 'asc'
    }),
    new TableData({
      name: 'targetCount',
      label: 'Targets'
    //  sortable: true
    }),
    new TableData({
      name: 'diseaseCount',
      label: 'Diseases'
     // sortable: true
    }),
    new TableData({
      name: 'ligandCount',
      label: 'Ligands',
      // sortable: true
    }),
  ];

  _sources: any;

  constructor(private renderer: Renderer2,
              private changeDetector: ChangeDetectorRef,
              private scrollDispatcher: ScrollDispatcher) {
    this._sources = SOURCES;
  }

  ngOnInit() {
    console.log(this);
    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      console.log(data);
      if (data) {
        console.log(data);
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
