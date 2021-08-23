import {Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ColorScheme, CentralStorageService} from '../../pharos-services/central-storage.service';
import {PDBRegion} from '../../models/pdb-report';

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
  @Input() predictedStructures: any[] = [];
  @Input() structureIndex = 0;
  @Input() targetResidues: PDBRegion[] = [];

  stage: any;
  NGL: any;


  /**
   * no args
   */
  constructor(
    private centralStorageService: CentralStorageService,
    @Inject(PLATFORM_ID) private platformID: any) {
  }

  /**
   * create ngl instance and load view
   */
  ngOnInit() {
    if ((this.pdbid || this.predictedStructures.length > 0) && isPlatformBrowser(this.platformID)) {
      const importedModule = import('ngl').then(NGL => {
        this.NGL = NGL;
        this.centralStorageService.pdbColorSchemeChanged.subscribe(newColor => {
          this.reloadStructure();
        });
        this.centralStorageService.pdbRepresentationChanged.subscribe(newColor => {
          this.reloadStructure();
        });

        this.stage = new this.NGL.Stage(this.viewerContainer.nativeElement, {backgroundColor: 'white'});
        this.stage.handleResize();
        // Handle window resizing
        window.addEventListener('resize', (event) => {
          this.stage.handleResize();
        }, {passive: true});
        this.reloadStructure();
      });
    }
  }

  reloadStructure() {
    this.stage.removeAllComponents();
    const rep = this.centralStorageService.getField('pdbRepresentation');
    const color = this.centralStorageService.getField('pdbColorScheme');
    if (this.pdbid) {
    this.stage.loadFile(`rcsb://${this.pdbid}`).then(o => {
      const schemeId = this.NGL.ColormakerRegistry.addSelectionScheme([
        ['red', this.targetResidues.map(r => `${r.refStart}-${r.refStart + r.length}`).join(' or ')],
        ['white', '*']
      ], 'Target');
      const scheme = color === ColorScheme.target ? schemeId : color;
      o.addRepresentation(rep, {colorScheme: scheme});
      o.autoView();
    }).catch(
      e => {
        alert(e);
      }
    );
    } else if (this.predictedStructures.length > 0) {
      const schemeId = this.NGL.ColormakerRegistry.addSelectionScheme([
        ['red', '*'], 'Target']);
      const scheme = color === ColorScheme.target ? schemeId : color;
      const colorDomain = this.centralStorageService.getField('pdbColorScheme') === ColorScheme.bfactor ? [25, 100] : null;
      this.stage.loadFile(`https://pharos-alphafold.ncats.io/models/${this.predictedStructures[this.structureIndex].structure}.pdb`)
        .then(o => {
        o.addRepresentation(rep, {colorScheme: scheme, colorDomain});
        o.autoView();
      }).catch(
        e => {
          alert(e);
        }
      );
    }
  }

  ngOnChanges(change) {
    if (this.stage && isPlatformBrowser(this.platformID) && (change.pdbid || change.structureIndex)) {
      this.reloadStructure();
    }
  }

}
