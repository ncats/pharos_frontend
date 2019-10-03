import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import * as Protvista from 'ProtVista';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';

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
  encapsulation: ViewEncapsulation.None
})

export class AaSequencePanelComponent extends DynamicPanelComponent implements OnInit {

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
   * target id for uniprot viewer
   */
  id: string;

  /**
   * set up active sidenav component
   * @param navSectionsService
   */
  constructor(
    private navSectionsService: NavSectionsService
  ) {
    super();
  }

  /**
   * set up data change subscription
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data.sequence) {
          this.ngUnsubscribe.next();
          this.setterFunction();
          this.loading = false;
        }
      });
  }

  /**
   * count and parse sequence
   * initialize protvista viewer
   * // todo set boolean breakpoint and only load if not mobile
   */
  setterFunction() {
    if (this.data.sequence[0].text) {
      this.parseSequence();
      this.getCounts();
    }
    const r = new Protvista({
      el: this.viewerContainer.nativeElement,
      uniprotacc: this.id
    });
  }

  /**
   * get counts of each amino acid
   * used for bar chart
   */
  getCounts(): void {
    const charMap: Map<string, number> = new Map<string, number>();
    this.data.sequence[0].text.split('').map(char => {
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
    const split = this.splitString(this.data.sequence[0].text, length);
  const splitseq: any[] = [];
  split.forEach((chunk, index) =>  {
     if (index === 0) {
       splitseq.push({chunk: chunk, residues: index + 1 + '-' + (index + 1) * length});
     } else if (index === split.length - 1) {
       splitseq.push({chunk: chunk, residues: index * length + '-' + this.data.sequence[0].text.length});
     } else {
       splitseq.push({chunk: chunk, residues: index * length + '-' + (index + 1) * length});
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
  splitString (sstring: string, size: number): string[] {
    const re: RegExp  = new RegExp('.{1,' + size + '}', 'g');
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
