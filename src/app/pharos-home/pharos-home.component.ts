import {Component, ContentChild, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Topic} from '../models/topic';
import {PharosApiService} from '../pharos-services/pharos-api.service';
import {NcatsHeaderComponent} from "../tools/ncats-header/ncats-header.component";

@Component({
  selector: 'pharos-home',
  templateUrl: './pharos-home.component.html',
  styleUrls: ['./pharos-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

/**
 *
 */
export class PharosHomeComponent implements OnInit {

  @ContentChild('appHeader', {static: true}) header: NcatsHeaderComponent;

  /**
   * elements of the page scroll to
   */
  @ViewChild('topicsRow', {read: ElementRef, static: true}) topicsElemRef: ElementRef;

  /**
   * element of the page to scroll to
   */
  @ViewChild('details', {read: ElementRef, static: true}) elemRef: ElementRef;
  topics: any;
  position: string;
  animationState = 'out';

  constructor(private pharosApiService: PharosApiService) {
  }

  /**
   * grab topics dummy data
   */
  ngOnInit() {
    console.log(this);
    this.topics = this.pharosApiService.TOPICS.slice(1, 5);
  }

  ngAfterViewInit() {
    console.log(this);
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
    // todo: work around window api for angular universal
    if (window.pageYOffset > 64 || document.documentElement.scrollTop > 64 || document.body.scrollTop > 64) {
      this.animationState = 'in';
    } else if (this.position && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 64) {
      this.animationState = 'out';
    }
  }

}
