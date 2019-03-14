import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HelpDataService} from './services/help-data.service';

/**
 * component to hold help information
 */
@Component({
  selector: 'pharos-help-panel',
  templateUrl: './help-panel.component.html',
  styleUrls: ['./help-panel.component.scss']
})
export class HelpPanelComponent implements OnInit {
  searchCtrl: FormControl = new FormControl();
  rawData: any;
  description: string;
  sources: any;

  constructor(private helpDataService: HelpDataService) { }

  ngOnInit() {
    console.log(this);
    this.helpDataService.data$.subscribe(res => this.rawData = res);
    this.helpDataService.sources$.subscribe(res => this.sources = res);
   console.log(this.helpDataService.getSources(this.helpDataService.label));

  }

  search() {}

  getLabel() {
    return this.helpDataService.label;
  }

  showArticle(source: any) {
    console.log(this);
  }

}
