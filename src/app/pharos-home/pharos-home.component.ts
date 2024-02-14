import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {PharosApiService} from '../pharos-services/pharos-api.service';
import {HeaderOptionsService} from '../pharos-services/header-options.service';
import {CommonModule, DOCUMENT} from '@angular/common';
import {LoadingService} from '../pharos-services/loading.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchComponent} from '../tools/search-component/search.component';
import {MatIcon} from '@angular/material/icon';
import {AboutPanelComponent} from './about-panel/about-panel.component';
import {DataTypesPanelComponent} from './data-types-panel/data-types-panel.component';
import {NewsPanelComponent} from './news-panel/news-panel.component';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, SearchComponent, MatIcon, AboutPanelComponent, DataTypesPanelComponent, NewsPanelComponent],
  selector: 'pharos-home',
  templateUrl: './pharos-home.component.html',
  styleUrls: ['./pharos-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

/**
 *
 */
export class PharosHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * elements of the page scroll to
   */
  @ViewChild('topicsRow', {read: ElementRef, static: true}) topicsElemRef: ElementRef;

  /**
   * element of the page to scroll to
   */
  @ViewChild('details', {read: ElementRef, static: true}) elemRef: ElementRef;
  topics: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private headerOptionsService: HeaderOptionsService,
    private loadingService: LoadingService,
    private pharosApiService: PharosApiService) {
    this.headerOptionsService.setOptions({searchBar: false, animationState: 'out'});
  }

  /**
   * grab topics dummy data
   */
  ngOnInit() {
    this.topics = this.pharosApiService.TOPICS.slice(1, 5);
  }
  ngAfterViewInit() {
    this.loadingService.toggleVisible(false);
  }

  /**
   * scroll to details section of the home page
   */
  goToDetails(): void {
    this.elemRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  /**
   * scroll to topics section of the home page
   */
  goToTopics(): void {
    this.topicsElemRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  /**
   * method that checks to see if the user has scrolled past a certain point.
   * switches menu type
   * @returns void
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.pageYOffset > 64 || this.document.documentElement.scrollTop > 64 || this.document.body.scrollTop > 64) {
      this.headerOptionsService.setOptions({animationState: 'in'});
    } else if (window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop < 64) {
      this.headerOptionsService.setOptions({animationState: 'out'});
    }
  }

  ngOnDestroy() {
    this.headerOptionsService.setOptions({searchBar: true, animationState: 'in'});
  }

}
