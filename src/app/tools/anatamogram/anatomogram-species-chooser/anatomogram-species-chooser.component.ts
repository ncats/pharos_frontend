import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'ncats-anatomogram-species-chooser',
  templateUrl: './anatomogram-species-chooser.component.html',
  styleUrls: ['./anatomogram-species-chooser.component.css']
})
export class AnatomogramSpeciesChooserComponent implements OnInit {
  speciesSelectCtrl: FormControl = new FormControl();

  @Output()
  speciesChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.speciesSelectCtrl.valueChanges.subscribe(res => this.speciesChange.emit(res));
  }

}
