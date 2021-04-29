import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';

@Component({
  selector: 'pharos-affiliate-links',
  templateUrl: './affiliate-links.component.html',
  styleUrls: ['./affiliate-links.component.scss']
})
export class AffiliateLinksComponent extends TargetPanelBaseComponent implements OnInit {
  constructor(
    public navSectionsService: NavSectionsService,
    changeRef: ChangeDetectorRef,
    public location: Location
  ) {
    super(navSectionsService, changeRef);

  }

  navigate(url) {
    window.open(url, '_blank');
  }

  setStatus(url) {
    window.status = url;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initialize();
  }

  initialize(): void {
    console.log('initializing...');
  }

  hasData(): boolean {
    return this.target && this.target.affiliateLinks && this.target.affiliateLinks.length > 0;
  }
}
