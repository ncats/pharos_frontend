import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import * as NGL from 'ngl';

/**
 * component to render a pdb structure with ngl
 */
@Component({
  selector: 'pharos-protein-structure-viewer',
  templateUrl: './protein-structure-viewer.component.html',
  styleUrls: ['./protein-structure-viewer.component.scss']
})
export class ProteinStructureViewerComponent implements OnInit, OnChanges {

  /**
   * div element holder
   */
  @ViewChild('proteinStructureViewer', {static: true}) viewerContainer: ElementRef;

  /**
   * id of pdb entry (protein and molecule) t orender
   */
  @Input() pdbid: string;

  stage: any;


/**
   * no args
   */
  constructor() {

}

  /**
   * create ngl instance and load view
   */
  ngOnInit() {
    this.stage = new NGL.Stage(this.viewerContainer.nativeElement, {backgroundColor: 'white'});
    // Handle window resizing
    window.addEventListener( 'resize', ( event ) => {
      this.stage.handleResize();
    }, {passive: true} );
    this.stage.loadFile(`rcsb://${this.pdbid}`, {defaultRepresentation: true}).then().catch();
  }

  ngOnChanges(change) {
    if(this.stage) {
      this.stage.removeAllComponents();
      this.stage.loadFile(`rcsb://${this.pdbid}`, {defaultRepresentation: true}).then(component => {
      });
    }
  }

}
