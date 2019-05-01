import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'ncats-anatomogram-details-chooser',
  templateUrl: './anatomogram-details-chooser.component.html',
  styleUrls: ['./anatomogram-details-chooser.component.css']
})
export class AnatomogramDetailsChooserComponent implements OnInit {
  detailsSelectCtrl: FormControl = new FormControl();

  @Output()
  detailsChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.detailsSelectCtrl.valueChanges.subscribe(res => this.detailsChange.emit(res));
  }

}
