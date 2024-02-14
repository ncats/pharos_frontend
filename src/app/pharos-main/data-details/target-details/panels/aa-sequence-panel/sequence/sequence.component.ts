import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DynamicPanelBaseComponent} from '../../../../../../tools/dynamic-panel-base/dynamic-panel-base.component';
import {Target} from '../../../../../../models/target';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatIcon, CommonModule],
  selector: 'pharos-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent extends DynamicPanelBaseComponent implements OnInit, OnChanges {
  /**
   * target to display
   */
  @Input() target: Target;

  /**
   * chunked amino acid sequence
   */
  aasequence: any[];
  panelOpenState = false;

  constructor(private clipboard: Clipboard,
              private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    if (this.target?.sequence) {
      this.parseSequence();
    }
  }

  ngOnChanges(change: any) {
    if (change.target && !change.target.firstChange) {
      this.parseSequence();
    }
  }
  /**
   * parse the amino acid sequence into smaller chunks for display
   */
  parseSequence(): void {
    const length = 10;
    const split = this.splitString(this.target.sequence, length);
    const splitseq: any[] = [];
    split.forEach((chunk, index) => {
      splitseq.push({chunk, lastIndex: index * length + chunk.length});
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

  copySequence() {
    if (this.clipboard.copy(this.target.sequence)) {
      this.snackBar.open('Sequence copied to clipboard!');
    } else {
      this.snackBar.open('Copy failed');
    }
  }
}
