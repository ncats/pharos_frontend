import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import changelog from "raw-loader!./../../../CHANGELOG.md";


@Component({
  selector: 'pharos-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ChangelogComponent implements OnInit {

  constructor(private http: HttpClient) { }
  data = changelog;
  ngOnInit(): void {
  }

}
