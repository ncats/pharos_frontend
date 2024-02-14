import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';
import {AffiliateLink} from '../../../../../models/target';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, FlexLayoutModule, MatCardModule, TargetPanelBaseComponent, MatTooltip
  ],
  selector: 'pharos-affiliate-links',
  templateUrl: './affiliate-links.component.html',
  styleUrls: ['./affiliate-links.component.scss']
})
export class AffiliateLinksComponent extends TargetPanelBaseComponent implements OnInit {
  constructor(
    changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService)
  {
    super(changeRef, dynamicServices);
  }
  count(): number {
    return this.target?.affiliateLinks.length;
  }

  inpageNavigate(link) {
    const anchor = this.pageAnchor(link);
    this.dynamicServices.navSectionsService.setActiveTab(anchor);
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
      return 'protVistaViewer';
    }
    return '';
  }

  getImage(link: AffiliateLink): string {
    switch (link.sourceName) {
      case 'Dark Kinase Knowledgebase':
        return 'CDK13.svg';
      case 'ProKinO':
        return 'bg.png';
      case 'Target Illumination GWAS Analytics (TIGA)':
        return 'idg-tiga.png';
      case 'GlyGen':
        return 'glygen.png';
      case 'GENEVA':
        return '300x150xGENEVA.png.pagespeed.ic.KBExA_BGr-.webp';
      case 'ARCHS4':
        return 'archs4.png';
      case 'RESOLUTE':
        return 'resolute.png';
      case 'PubChem':
        return 'pubchem.png';
    }
  }
}
