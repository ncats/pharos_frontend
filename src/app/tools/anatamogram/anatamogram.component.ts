import {Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatRadioChange} from "@angular/material";
import {AnatomogramImageComponent} from "./anatomogram-image/anatomogram-image.component";

@Component({
  selector: 'pharos-anatamogram',
  templateUrl: './anatamogram.component.html',
  styleUrls: ['./anatamogram.component.scss']
})
export class AnatamogramComponent implements OnInit {
  @Input() species: string = 'mus_musculus';
  details: string;

  @Input() tissues: string[];
  @ViewChildren(AnatomogramImageComponent) anatamograms: QueryList<AnatomogramImageComponent>;


  constructor() { }

  ngOnInit() {
  }

  toggleView(change: MatRadioChange) {
    this.details = change.value;

  }

  reset() {
    this.anatamograms.forEach(instance => instance.resetZoom());
  }
}
