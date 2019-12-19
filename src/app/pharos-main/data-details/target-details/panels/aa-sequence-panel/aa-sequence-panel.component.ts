import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import * as Protvista from 'ProtVista';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {BreakpointObserver} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';

/**
 * displays amino acid sequence data
 * contains bar chart of amino acid counts
 * amino acid sequence
 * protvista viewer - browser only
 */
@Component({
  selector: 'pharos-aa-sequence-panel',
  templateUrl: './aa-sequence-panel.component.html',
  styleUrls: ['./aa-sequence-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AaSequencePanelComponent extends DynamicPanelComponent implements OnInit {
  /**
   * target to display
   */
  @Input() target: Target;

  /**
   * div element that holds the protvista viewer
   */
  @ViewChild('protVistaViewer', {static: true}) viewerContainer: ElementRef;

  /**
   * chunked amino acid sequence
   */
  aasequence: any[];

  /**
   * amino acid residue counts
   */
  residueCounts: any[];

  /**
   * set up active sidenav component
   * @param breakpointObserver
   * @param navSectionsService
   * @param changeRef
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private navSectionsService: NavSectionsService,
    private changeRef: ChangeDetectorRef) {
    super();
  }

  /**
   *    * count and parse sequence
   * initialize protvista viewer
   * set up data change subscription
   */
  ngOnInit() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target.sequence) {
          this.parseSequence();
          this.getCounts();
        }
        if (!this.isSmallScreen) {
          const r = new Protvista({
            el: this.viewerContainer.nativeElement,
            uniprotacc: this.target.accession
          });
        }
        this.loading = false;
        this.changeRef.markForCheck();
      });

  }

  /**
   * get counts of each amino acid
   * used for bar chart
   */
  getCounts(): void {
    const charMap: Map<string, number> = new Map<string, number>();
    this.target.sequence.split('').map(char => {
      let count = charMap.get(char);
      if (count) {
        charMap.set(char, ++count);
      } else {
        charMap.set(char, 1);
      }
    });
    this.residueCounts = Array.from(charMap.entries());
  }

  /**
   * parse the amino acid sequence into smaller chunks for display
   */
  parseSequence(): void {
    const length = 70;
    const split = this.splitString(this.target.sequence, length);
    const splitseq: any[] = [];
    split.forEach((chunk, index) => {
      if (index === 0) {
        splitseq.push({chunk, residues: index + 1 + '-' + (index + 1) * length});
      } else if (index === split.length - 1) {
        splitseq.push({chunk, residues: index * length + '-' + this.target.sequence.length});
      } else {
        splitseq.push({chunk, residues: index * length + '-' + (index + 1) * length});
      }
    });
    this.aasequence = splitseq;
  }

  /**
   * Split a string into chunks of the given size
   * @param  {String} sstring is the String to split
   * @param  {Number} size is the size you of the cuts
   * @return {Array} an Array with the strings
   */
  splitString(sstring: string, size: number): string[] {
    const re: RegExp = new RegExp('.{1,' + size + '}', 'g');
    return sstring.match(re);
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
