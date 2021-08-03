import {Component, Input, OnInit} from '@angular/core';
import {TourService} from '../../pharos-services/tour.service';

@Component({
  selector: 'pharos-tutorial-link',
  templateUrl: './tutorial-link.component.html',
  styleUrls: ['./tutorial-link.component.scss']
})
export class TutorialLinkComponent implements OnInit {
  @Input() tutorialName: string;

  constructor(
    private tourService: TourService) { }

  ngOnInit(): void {
  }

  openTutorial() {
    this.tourService.runTutorial(this.tutorialName);
  }
}
