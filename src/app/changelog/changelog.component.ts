import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import changelog from 'raw-loader!./../../../CHANGELOG.md';
import {MarkdownComponent} from 'ngx-markdown';


@Component({
  standalone: true,
  imports: [
    MarkdownComponent
  ],
  selector: 'pharos-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ChangelogComponent implements OnInit {
  constructor() { }
  data = changelog;
  ngOnInit(): void {
  }
}
