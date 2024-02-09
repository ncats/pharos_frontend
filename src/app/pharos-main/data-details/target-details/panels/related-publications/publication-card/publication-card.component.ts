import {Component, Input, OnInit} from '@angular/core';
import {Publication} from '../../../../../../models/publication';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {
  PropertyDisplayComponent
} from '../../../../../../tools/generic-table/components/property-display/property-display.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIcon, PropertyDisplayComponent],
  selector: 'pharos-publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.scss']
})
export class PublicationCardComponent implements OnInit {
  @Input() publication: Publication;
  generifs: any[] = [];

  showAbstract = false;
  constructor() { }

  ngOnInit(): void {
    this.generifs = this.publication?.generifs.filter(f => {
      return !this.rifisdumb(f.text);
    })
  }

  shortAuthorString() {
    const authors = this.publication.authors.split(',');
    if(authors.length > 2) {
      const namePieces = authors[0].split(' ');
      return namePieces[namePieces.length - 1] + ' et al.';
    }
    return authors;
  }

  rifisdumb(rifText: string){
    return this.cleanText(rifText) === this.cleanText(this.publication.title);
  }

  cleanText(text) {
    return text.replace(/[^a-zA-Z0-9 ]/g, '').replace(/(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)/g, '');
  }
}
