import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-affiliate-link',
  templateUrl: './affiliate-link.component.html',
  styleUrls: ['./affiliate-link.component.scss']
})
export class AffiliateLinkComponent implements OnInit {

  constructor() { }
  @Input() dataSource: string;
  @Input() value: string;
  url: string;

  ngOnInit(): void {
    this.url = this.mapURL();
  }

  mapURL(): string {
    switch (this.dataSource)  {
      case "Dark Kinase Knowledgebase":
        return `https://darkkinome.org/kinase/${this.value}`;
      case "ProKinO":
        return `https://prokino.uga.edu/kinview/`;
    }
    return "";
  }

  getTooltip(): string{
    switch (this.dataSource) {
      case "ProKinO":
        return '';
    }
    return 'Explore ' + this.value + ' on ' + this.dataSource;
  }

  getLinkText(): string {
    switch (this.dataSource) {
      case "ProKinO":
        return "Compare Kinases on ProKinO";
    }
    return this.dataSource;

  }
}
