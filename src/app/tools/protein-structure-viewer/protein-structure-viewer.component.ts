import {Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import * as NGL from 'ngl';
import {isPlatformBrowser} from "@angular/common";

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
   * id of pdb entry (protein and molecule) to render
   */
  @Input() pdbid: string;

  stage: any;


  /**
   * no args
   */
  constructor(@Inject(PLATFORM_ID) private platformID: Object) {

  }

  /**
   * create ngl instance and load view
   */
  ngOnInit() {
    if (this.pdbid && isPlatformBrowser(this.platformID)) {
      const importedModule = import('ngl').then(NGL => {
        this.stage = new NGL.Stage(this.viewerContainer.nativeElement, {backgroundColor: 'white'});
        this.stage.handleResize();
        // Handle window resizing
        window.addEventListener('resize', (event) => {
          this.stage.handleResize();
        }, {passive: true});
        this.stage.loadFile(`rcsb://${this.pdbid}`, {defaultRepresentation: true}).then().catch();
      });
    }
  }

  ngOnChanges(change) {
    if (this.stage && this.pdbid && isPlatformBrowser(this.platformID)) {
      this.stage.removeAllComponents();
      this.stage.loadFile(`rcsb://${this.pdbid}`, {defaultRepresentation: true}).then(component => {
      });
    }
  }

}
