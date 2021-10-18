import {AfterViewInit, Component, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LoadingService} from '../../pharos-services/loading.service';
import {MolChangeService} from './services/mol-change.service';
import {isPlatformBrowser} from '@angular/common';

/**
 * component to initialize a marvin js sketcher instance
 * currently uses an iframe, which is gross
 */
@Component({
  selector: 'app-sketcher',
  templateUrl: './sketcher.component.html',
  styleUrls: ['./sketcher.component.scss'],
})
export class SketcherComponent implements AfterViewInit {

  /**
   * initialize data helper functions as well as dom sanitizing and ngzone
   */
  constructor(
    private molChangeService: MolChangeService,
    @Inject(PLATFORM_ID) private platformID: any
  ) {
  }

  marvin: any;
  marvinElement: any;

  updateTime: any;

  /**
   * initialize marvin js instance
   */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformID)) {
      // @ts-ignore
      this.marvin = window?.ChemicalizeMarvinJs;
    }
    if (isPlatformBrowser(this.platformID) && this.marvin) {
      this.marvin.createEditor('#marvin-tool').then((marvin) => {
        this.marvinElement = marvin;
        const existingSmiles = this.molChangeService.getSmiles();
        if (existingSmiles.length > 0) {
          this.marvinElement.importStructure('smiles', existingSmiles);
        }

        function handleMolChange(event) {
          this.marvinElement.exportStructure('smiles').then((smiles) => {
            if (!this.updateTime || (Date.now() - this.updateTime > 2000)) {
              this.molChangeService.updateSmiles(smiles, 'sketcher');
            }
          });
        }
        this.marvinElement.on('molchange', handleMolChange.bind(this));
      });

      this.molChangeService.smilesChanged.subscribe(function(changeObj) {
        if (changeObj.source !== 'sketcher') {
          if (changeObj.newSmiles.length > 0) {
            this.updateTime = Date.now();
            this.marvinElement.importStructure('smiles', changeObj.newSmiles).then(res => {
            }, err => {
              alert('Smiles Parsing Failed\n\n' + err);
              this.marvinElement.exportStructure('smiles').then((smiles) => {
                {
                  this.molChangeService.updateSmiles(smiles, changeObj.source);
                }
              });
            });
          } else {
            this.marvinElement.clear();
          }
        }
      }.bind(this));
    }
  }
}
