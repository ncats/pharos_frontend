import {Component, Input, OnInit} from '@angular/core';
import {DataSourceInfo, DataVersionInfo} from "../../models/dataVersion";
import {PharosProperty} from "../../models/pharos-property";

@Component({
  selector: 'pharos-data-version-card',
  templateUrl: './data-version-card.component.html',
  styleUrls: ['./data-version-card.component.scss']
})
export class DataVersionCardComponent implements OnInit {
  @Input() dvInfo: DataVersionInfo;
  constructor() { }
  commonFields: PharosProperty[] = [
    new PharosProperty({
      name: 'key',
      label: 'Value'
    }),
    new PharosProperty({
      name: 'file',
      label: 'File'
    }),
    new PharosProperty({
      name: 'version',
      label: 'Version'
    })
  ]
  releaseFields: PharosProperty[] = [
    ...this.commonFields,
    new PharosProperty({
      name: 'releaseDate',
      label: 'Release Date'
    })];
  downloadFields: PharosProperty[] = [
    ...this.commonFields,
    new PharosProperty({
      name: 'downloadDate',
      label: 'Download Date'
    })];

  getFields(ds: DataSourceInfo): PharosProperty[] {
    if (ds.files[0].releaseDate) {
      return this.releaseFields;
    }
    return this.downloadFields;
  }

  ngOnInit(): void {
  }

}
