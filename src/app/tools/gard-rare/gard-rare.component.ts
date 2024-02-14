import {Component, Input, OnInit} from '@angular/core';
import {Disease} from '../../models/disease';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [
      CommonModule,
    MatTooltip,
    MatIcon
  ],
  selector: 'pharos-gard-rare',
  templateUrl: './gard-rare.component.html',
  styleUrls: ['./gard-rare.component.scss']
})
export class GardRareComponent implements OnInit {
  @Input() disease: Disease;
  constructor() { }

  ngOnInit(): void {
  }

  gardID() {
    const gardIDobj = this.disease?.mondoEquivalents.find(syn => syn.id.startsWith('GARD:'));
    if (gardIDobj && gardIDobj.id) {
      const pieces = gardIDobj.id.split(':');
      const term = pieces[1];
      return this.trimZeros(term);
    }
    return null;
  }
  gardLink(){
    return `https://rarediseases.info.nih.gov/diseases/${this.gardID()}/origin_pharos`;
  }
  trimZeros(term) {
    return term.replace(/^0+/, '');
  }
}
