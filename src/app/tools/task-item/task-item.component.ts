import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {LocalStorageService} from '../../pharos-services/local-storage.service';
import {TourService} from '../../pharos-services/tour.service';
import {NavigationExtras, Router} from '@angular/router';
import {TourType} from '../../models/tour-type';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'pharos-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() text: string;
  @Input() tourName: string;

  constructor(private localStorage: LocalStorageService,
              private tourService: TourService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformID: any) {
  }

  ngOnInit(): void {
  }

  tutorialIsComplete() {
    if (isPlatformBrowser(this.platformID)) {
      return this.localStorage.store.getItem(this.tourName) === 'complete';
    }
  }

  click(event) {
    if (this.tourName === TourType.StructureSearchTour) {
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: '',
        queryParams: {
          tutorial: this.tourName
        },
      };
      this.router.navigate(['/structure'], navigationExtras);
      return;
    }
    event.preventDefault();
    this.tourService.runTutorial(this.tourName);
  }
}
