import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pharos-citation',
  templateUrl: './citation.component.html',
  styleUrls: ['./citation.component.scss']
})
export class CitationComponent implements OnInit {
  @Input() citation;
  @Input() full = false;
  constructor() { }
  get authors() {
    return this.citation.author.map(o => o.name).join(', ');
  }
  ngOnInit(): void {
  }

}
