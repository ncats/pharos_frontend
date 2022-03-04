import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../pharos-services/local-storage.service';
import {TourService} from '../../pharos-services/tour.service';
import {NavigationExtras, Router} from '@angular/router';
import {TourType} from '../../models/tour-type';

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
              private router: Router) {
  }

  ngOnInit(): void {
  }

  tutorialIsComplete() {
    return this.localStorage.store.getItem(this.tourName) === 'complete';
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
