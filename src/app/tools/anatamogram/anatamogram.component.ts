import {Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatRadioChange} from '@angular/material';
import {AnatomogramImageComponent} from './anatomogram-image/anatomogram-image.component';
import {AnatamogramHoverService} from './anatamogram-hover.service';

@Component({
  selector: 'pharos-anatamogram',
  templateUrl: './anatamogram.component.html',
  styleUrls: ['./anatamogram.component.scss']
})
export class AnatamogramComponent implements OnInit {
  @Input() species = 'mus_musculus';
  details: string;

  @Input() tissues: string[];
  @ViewChildren(AnatomogramImageComponent) anatamograms: QueryList<AnatomogramImageComponent>;


  constructor(
    private anatamogramHoverService: AnatamogramHoverService
  ) { }

  ngOnInit() {
    this.anatamogramHoverService.tissues$.subscribe(change => {
      this.anatamograms.forEach(instance => instance.highlightTissue(change));
    });
  }

  toggleView(change: MatRadioChange) {
    this.details = change.value;

  }

  reset() {
    this.anatamograms.forEach(instance => instance.resetZoom());
  }
}
