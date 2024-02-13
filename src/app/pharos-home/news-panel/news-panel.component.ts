import {AfterViewInit, Component, Inject, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * panel that reads a list of comments/messages from firebase
 */
@Component({
  standalone: true,
  imports: [FlexLayoutModule],
  selector: 'pharos-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewsPanelComponent implements AfterViewInit {
  /**
   * constructor with database depencency
   */
  constructor(
    @Inject(PLATFORM_ID) private platformID: any) {  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      (<any>window).twttr?.widgets.load();
    }
  }
}
