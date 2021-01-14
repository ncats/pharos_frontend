import {Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Target} from "../../../../../models/target";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {takeUntil} from "rxjs/operators";
import {isPlatformBrowser} from "@angular/common";

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

  @ViewChild("myTrackId", {static: true}) trackElement: ElementRef;
  @ViewChild('protVistaSequence', {static: true}) protVistaSequence: ElementRef;
  @ViewChild('protVistaNavigation', {static: true}) protVistaNavigation: ElementRef;

  constructor(public navSectionsService: NavSectionsService,
              @Inject(PLATFORM_ID) public platformID: Object) {
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
        this.target = this.data.targets;

        if (isPlatformBrowser(this.platformID)) {
          this.protVistaNavigation.nativeElement.setAttribute('length', this.target.sequence.length);
          this.protVistaSequence.nativeElement.setAttribute('length', this.target.sequence.length);

          this.fudgeUpSomeData();
        }
      });
  }

  fudgeUpSomeData() {
    const annotatedSequence = [];
    for (let aa of this.target.sequence) {
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
            aa: this.target.sequence[Math.floor(this.target.sequence.length * Math.random())],
            bits: bits[i]
          });
      }
      annotatedSequence.push(residue);
    }
    this.protVistaSequence.nativeElement.data = {sequence: annotatedSequence};
  }
}
