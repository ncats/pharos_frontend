import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pharos-anatamogram',
  templateUrl: './anatamogram.component.html',
  styleUrls: ['./anatamogram.component.scss']
})
export class AnatamogramComponent implements OnInit {

  species: string;
  details: string;

  constructor() { }

  ngOnInit() {
    console.log(this);
  }

  setSpecies(species: string) {
    this.species = species;
  }

  setdetails(details: string) {
    this.details = details;
  }
}
