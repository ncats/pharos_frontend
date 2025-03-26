import {Component, OnInit} from '@angular/core';
// @ts-ignore
import changelog from 'raw-loader!./../../../CHANGELOG.md';
import {MarkdownComponent} from 'ngx-markdown';
import {ReviewBannerService} from '../pharos-services/review-banner.service';


@Component({
  standalone: true,
  imports: [
    MarkdownComponent
  ],
  selector: 'pharos-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})

export class ChangelogComponent implements OnInit {
  constructor( public bannerService: ReviewBannerService) { }
  data = changelog;
  ngOnInit(): void {
  }
}
