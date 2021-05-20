import {ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../../models/target";
import {NavSectionsService} from "../../../../../../tools/sidenav-panel/services/nav-sections.service";
import {takeUntil} from "rxjs/operators";
import {isPlatformBrowser} from "@angular/common";
import {AaSequencePanelComponent} from "../../aa-sequence-panel/aa-sequence-panel.component";

@Component({
  selector: 'pharos-sequence-logo',
  templateUrl: './sequence-logo.component.html',
  styleUrls: ['./sequence-logo.component.scss']
})
export class SequenceLogoComponent extends DynamicPanelComponent implements OnInit {
  /**
   * target to display
   */
  @Input() target: Target;

  isPlatformBrowser() {
    return isPlatformBrowser(this.platformID);
  }

  @ViewChild("weblogo", {static: true}) weblogo: ElementRef;

  constructor(public navSectionsService: NavSectionsService,
              @Inject(PLATFORM_ID) public platformID: Object,
              private changeDetectorRef: ChangeDetectorRef) {
    super(navSectionsService);
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets || this.target;

        if (isPlatformBrowser(this.platformID)) {
          import('ncats-protvista-viewer').then(() => {
            if (this.hasVariants()) {
              this.weblogo.nativeElement.setAttribute('sequence', JSON.stringify(this.target.sequenceVariants.residue_info));
            }
            if (this.hasAnnotations()) {
              this.weblogo.nativeElement.setAttribute('annotations', JSON.stringify(this.target.sequenceAnnotations));
            }
          });
        }

        this.changeDetectorRef.detectChanges();
      });
  }

  hasVariants(){
    return this.target.sequenceVariants && this.target.sequenceVariants.residue_info && this.target.sequenceVariants.residue_info.length > 0;
  }
  hasAnnotations(){
    return this.target.sequenceAnnotations && this.target.sequenceAnnotations.length > 0;
  }

  aaName(symbol: string){
    return AaSequencePanelComponent.getLongFormName(symbol);
  }
}
