import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as NGL from 'ngl';

/**
 * component to render a pdb structure with ngl
 */
@Component({
  selector: 'pharos-protein-structure-viewer',
  templateUrl: './protein-structure-viewer.component.html',
  styleUrls: ['./protein-structure-viewer.component.scss']
})
export class ProteinStructureViewerComponent implements OnInit {

  /**
   * div element holder
   */
  @ViewChild('proteinStructureViewer') viewerContainer: ElementRef;

  /**
   * id of pdb entry (protein and molecule) t orender
   */
  @Input() pdbid: string;

  /**
   * no args
   */
  constructor() { }

  /**
   * create ngl instance and load view
   */
  ngOnInit() {
    const stage = new NGL.Stage(this.viewerContainer.nativeElement, {backgroundColor: 'white'});
    // Handle window resizing
    window.addEventListener( 'resize', function( event ) {
      stage.handleResize();
    }, false );
    stage.loadFile(`rcsb://${this.pdbid}`, {defaultRepresentation: true}).then(component => {
    });
  }

}
