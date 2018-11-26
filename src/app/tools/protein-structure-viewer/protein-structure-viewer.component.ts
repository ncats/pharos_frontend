import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as NGL from 'ngl';

@Component({
  selector: 'pharos-protein-structure-viewer',
  templateUrl: './protein-structure-viewer.component.html',
  styleUrls: ['./protein-structure-viewer.component.scss']
})
export class ProteinStructureViewerComponent implements OnInit {
  @ViewChild('proteinStructureViewer') viewerContainer: ElementRef;

  @Input() pdbid: string;

  struc: any;
  constructor() { }

  ngOnInit() {
    console.log(this);
    // Fetch PDB ID 4CUP in MMTF format and print the decoded MMTF data
    /*MMTF.fetch(
      "2BQZ",
      // onLoad callback
      function( mmtfData ){ console.log( mmtfData ) },
      // onError callback
      function( error ){ console.error( error ) }
    );
*/

    const stage = new NGL.Stage( this.viewerContainer.nativeElement, {backgroundColor: "white"});
    // Handle window resizing
    window.addEventListener( "resize", function( event ){
      stage.handleResize();
    }, false );
    stage.loadFile(`rcsb://${this.pdbid}`, { defaultRepresentation: true } ).then(component => {
    })
  }

}
