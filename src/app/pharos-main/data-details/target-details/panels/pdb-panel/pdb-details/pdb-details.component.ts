import {Component, Input, OnInit} from '@angular/core';
import {PDBResult} from "../../../../../../models/pdb-report";

@Component({
  selector: 'pharos-pdb-details',
  templateUrl: './pdb-details.component.html',
  styleUrls: ['./pdb-details.component.scss']
})
export class PdbDetailsComponent implements OnInit {

  @Input() pdbResult: PDBResult;

  constructor() { }

  ngOnInit(): void {
  }

}
