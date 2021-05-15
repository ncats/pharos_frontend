import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {AffiliateLink} from '../../../../../models/target';

@Component({
  selector: 'pharos-affiliate-links',
  templateUrl: './affiliate-links.component.html',
  styleUrls: ['./affiliate-links.component.scss']
})
export class AffiliateLinksComponent extends TargetPanelBaseComponent implements OnInit {
  constructor(
    public navSectionsService: NavSectionsService,
    changeRef: ChangeDetectorRef)
  {
    super(navSectionsService, changeRef);
  }

  inpageNavigate(link) {
    const anchor = this.pageAnchor(link);
    this.navSectionsService.setActiveTab(anchor);
  }

  navigate(url) {
    window.open(url, '_blank');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initialize();
  }

  hasData(): boolean {
    return this && this.target && this.target.affiliateLinks && this.target.affiliateLinks.length > 0;
  }

  pageAnchor(link: AffiliateLink): string {
    if (link.sourceName.toLowerCase().includes('tiga')) {
      return 'tiga';
    }
    if (link.sourceName.toLowerCase().includes('prokino')) {
      return 'variants';
    }
    return '';
  }
}
