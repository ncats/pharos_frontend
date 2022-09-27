import {Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../models/disease";

@Component({
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
