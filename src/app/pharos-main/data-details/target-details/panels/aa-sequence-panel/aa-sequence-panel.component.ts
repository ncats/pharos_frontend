import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import * as Protvista from 'ProtVista';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {BreakpointObserver} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from "@angular/common";

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
  expectedResidueCounts: any[];

  /**
   * set up active sidenav component
   * @param breakpointObserver
   * @param navSectionsService
   * @param changeRef
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: Object,
    public navSectionsService: NavSectionsService) {
    super(navSectionsService);
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
        if (!this.isSmallScreen && isPlatformBrowser(this.platformID)) {
          const r = new Protvista({
            el: this.viewerContainer.nativeElement,
            uniprotacc: this.target.accession
          });
        }
        this.loadingComplete();
        this.changeRef.markForCheck();
      });

  }

  /**
   * get counts of each amino acid
   * used for bar chart
   */
  getCounts(): void {
    const charMap: Map<string, number> = new Map<string, number>();
    const len = this.target.sequence.length;
    this.expectedResidueCounts = [
      ['L', 0.099591165 * len],
      ['S', 0.083248996 * len],
      ['E', 0.071040797 * len],
      ['A', 0.07017658 * len],
      ['G', 0.065741325 * len],
      ['P', 0.063110442 * len],
      ['V', 0.05966869 * len],
      ['K', 0.057261837 * len],
      ['R', 0.056425217 * len],
      ['T', 0.053570831 * len],
      ['Q', 0.047705615 * len],
      ['D', 0.047388773 * len],
      ['I', 0.043342517 * len],
      ['F', 0.03647334 * len],
      ['N', 0.035849413 * len],
      ['Y', 0.026661623 * len],
      ['H', 0.026235711 * len],
      ['C', 0.023004718 * len],
      ['M', 0.021316185 * len],
      ['W', 0.012186227 * len]
    ];
    this.expectedResidueCounts.forEach(pair => charMap.set(pair[0], 0));
    this.target.sequence.split('').map(char => {
      let count = charMap.get(char);
      charMap.set(char, ++count);
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
