import {Component, Input, OnInit} from '@angular/core';
import {saveAs} from 'file-saver';
import {Parser} from 'json2csv';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  selector: 'pharos-download-community-data-button',
  templateUrl: './download-community-data-button.component.html',
  styleUrls: ['./download-community-data-button.component.scss']
})
export class DownloadCommunityDataButtonComponent implements OnInit {
  @Input()
  predictionProps: any[];
  @Input()
  listIsFiltered: boolean;
  @Input()
  fileName: string;

  constructor() { }

  ngOnInit(): void {
  }

  downloadData(){
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(this.predictionProps.map(propObj => {
      const csvObj: any = {};
      for(let prop in propObj) {
        if (propObj[prop].term) {
          csvObj[prop] = propObj[prop].term;
        }
      }
      return csvObj;
    }));
    const csvBlob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
    if (this.listIsFiltered) {
      saveAs(csvBlob, this.fileName + '-filtered.csv');
    } else {
      saveAs(csvBlob, this.fileName + '.csv');
    }
  }

}
