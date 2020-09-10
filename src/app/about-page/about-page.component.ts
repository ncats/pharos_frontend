import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';
import {PharosProperty} from '../models/pharos-property';
import {DynamicPanelComponent} from "../tools/dynamic-panel/dynamic-panel.component";
import {takeUntil} from "rxjs/operators";
import {Ligand} from "../models/ligand";
import {DataSource} from "../models/dataSource";
import {ActivatedRoute} from "@angular/router";

/**
 * about page component
 */
@Component({
  selector: 'pharos-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * default active element for menu highlighting, will be replaced on scroll
   * @type {string}
   */
  activeElement = 'introduction';

  @Input() dataSources: DataSource[];
  @Input() dataSourcesProps: any;
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
      name: 'dataSource',
      label: 'Source',
      sortable: true,
      sorted: 'asc'
    }),
    new PharosProperty({
      name: 'targetCount',
      label: 'Targets',
       sortable: true
    }),
    new PharosProperty({
      name: 'diseaseCount',
      label: 'Diseases',
      sortable: true
    }),
    new PharosProperty({
      name: 'ligandCount',
      label: 'Ligands',
      sortable: true
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
    private scrollDispatcher: ScrollDispatcher,
    private _route: ActivatedRoute) {
    super();
  }

  /**
   * watch scrool and change active section on sidenav
   * todo could be updated to use the injectable sidenav
   */
  ngOnInit() {
    this.data = this._route.snapshot.data;
    this.initialize();
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data && this.data.results) {
          this.initialize();
        }
      });
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

  initialize(){
    this.dataSources = this.data.results.dataSourceCounts;
    this.dataSourcesProps = this.data.results.dataSourceCountsProps;
    this._sources = this.dataSourcesProps;
    this.loading = false;
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


  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
