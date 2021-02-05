import {ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../models/target";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {takeUntil} from "rxjs/operators";
import {isPlatformBrowser} from "@angular/common";
import * as fs from "fs";

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
          import("ncats-protvista-viewer").then(() => {
            this.weblogo.nativeElement.setAttribute('sequence', this.fudgeUpSomeData(this.target.sequence));
          });
        }

        this.changeDetectorRef.detectChanges();
      });
  }

  fudgeUpSomeData(sequence: string) {
    const annotatedSequence = [];
    for (let aa of sequence) {
      const residue = [];
      let bits = [];
      let total = 0, rr = 0;
      for (let i = 0; i < 5; i++) {
        rr = Math.random();
        total += rr;
        bits.push(rr);
      }
      const conservation = Math.random();
      bits = bits.map(b => b * conservation / total).sort((a, b) => b - a);
      residue.push({aa: aa, bits: bits[0]});
      for (let i = 1; i < bits.length; i++) {
        residue.push(
          {
            aa: sequence[Math.floor(sequence.length * Math.random())],
            bits: bits[i]
          });
      }
      annotatedSequence.push(residue);
    }
    return JSON.stringify(annotatedSequence);
  }
}
