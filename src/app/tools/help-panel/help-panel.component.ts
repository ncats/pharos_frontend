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

  constructor(private helpDataService: HelpDataService) { }

  ngOnInit() {
    this.helpDataService.data$.subscribe(res => this.rawData = res);
  }

  search() {}

}
