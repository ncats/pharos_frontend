import {Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Topic} from '../models/topic';
import {PharosApiService} from "../pharos-services/pharos-api.service";

@Component({
  selector: 'pharos-pharos-dashboard',
  templateUrl: './pharos-dashboard.component.html',
  styleUrls: ['./pharos-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PharosDashboardComponent implements OnInit {
  @ViewChild('topicsRow', {read: ElementRef}) topicsElemRef: ElementRef;
  @ViewChild('details', {read: ElementRef}) elemRef: ElementRef;
  topics: any;
  position: string;
  animationState = 'out';

  constructor(private pharosApiService: PharosApiService) {
  }

  ngOnInit() {
    this.topics = this.pharosApiService.TOPICS.slice(1,5);
    console.log(this);
  }

  goToDetails(): void {
    this.elemRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  goToTopics(): void {
    this.topicsElemRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  /**
   * method that checks to see if the user has scrolled past a certain point. pinned to the window object
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
