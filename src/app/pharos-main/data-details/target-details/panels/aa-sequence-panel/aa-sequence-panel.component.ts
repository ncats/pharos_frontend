import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import * as Protvista from 'ProtVista';

@Component({
  selector: 'pharos-aa-sequence-panel',
  templateUrl: './aa-sequence-panel.component.html',
  styleUrls: ['./aa-sequence-panel.component.css']
})

export class AaSequencePanelComponent extends DynamicPanelComponent implements OnInit {

  @ViewChild('protVistaViewer') viewerContainer: ElementRef;

  sequence: any[];

  residueCounts: any[];
  id: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
        }
      });
  }

  setterFunction() {
    this.parseSequence();
    const r = new Protvista({
      el: this.viewerContainer.nativeElement,
      uniprotacc: this.id
    });
    this.getCounts();
  }

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

  parseSequence(): void {
    const length = 70;
    const split = this.splitString(this.data.sequence[0].text, length);
   this.sequence = split.map((chunk, index) =>  {
     if (index === 0) {
       return {chunk: chunk, residues: index + 1 + '-' + (index + 1) * length};
     } else if (index === split.length - 1) {
       return {chunk: chunk, residues: index * length + '-' + this.data.sequence[0].text.length};
     } else {
         return {chunk: chunk, residues: index * length + '-' + (index + 1) * length};
     }
   });
  }

  /**
   * Split a string into chunks of the given size
   * @param  {String} string is the String to split
   * @param  {Number} size is the size you of the cuts
   * @return {Array} an Array with the strings
   */
  splitString (string: string, size: number): string[] {
    const re: RegExp  = new RegExp('.{1,' + size + '}', 'g');
    return string.match(re);
  }
}
