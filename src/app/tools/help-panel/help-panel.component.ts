import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HelpDataService} from './services/help-data.service';

/**
 * component to hold help information
 */
@Component({
  selector: 'pharos-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.css']
})
export class HelpPanelComponent implements OnInit {
  searchCtrl: FormControl = new FormControl();
  rawData: any;
  description: string;

  constructor(private helpDataService: HelpDataService) { }

  ngOnInit() {
    console.log("on init");
    this.helpDataService.data$.subscribe(res => this.rawData = res);
    this.helpDataService.description$.subscribe(res => this.description = res);
    console.log(this);
  }

  search() {}

  getLabel() {
    return this.helpDataService.label;
  }

}
