import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {LoadingService} from '../../pharos-services/loading.service';
import {MolConverterService} from './services/mol-converter.service';
import {StructureSetterService} from '../../tools/marvin-sketcher/services/structure-setter.service';

/**
 * component to initialize a marvin js sketcher instance
 * currently uses an iframe, which is gross
 */
@Component({
  selector: 'app-sketcher',
  templateUrl: './sketcher.component.html',
  styleUrls: ['./sketcher.component.css'],
})
export class SketcherComponent implements OnInit {

  /**
   * marvin sketcher instance
   */
  marvinSketcherInstance;

  /**
   * url for marvin resources
   */
  url: SafeResourceUrl;

  /**
   * smiles string if a structure is passed in
   */
  passedStructure: string;

  /**
   * initialize data helper functions as well as dom sanitizing and ngzone
   * set marvin source url using dom url sanitization
   * @param {MolConverterService} molConverter
   * @param {StructureSetterService} structureSetter
   * @param {DomSanitizer} sanitizer
   * @param {LoadingService} loadingService
   * @param {NgZone} ngZone
   */
  constructor(
    private molConverter: MolConverterService,
    private structureSetter: StructureSetterService,
    private sanitizer: DomSanitizer,
    public loadingService: LoadingService,
    private ngZone: NgZone
  ) {
    // todo : try to load sketcher without an iframe
    /*    this.marvin = window['MarvinJSUtil'];
        window.addEventListener("message", function(event) {
          try {
            var externalCall = JSON.parse(event.data);
           this.marvin.onReady(function() {
              this.marvin.sketcherInstance[externalCall.method].apply(this.marvin.sketcherInstance, externalCall.args);
            });
          } catch (e) {
          }
        }, false);*/
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./assets/vendor/marvin/editor.html');
  }

  /**
   * initialize marvin js instance
   */
  ngOnInit() {
   /* window.MarvinJSUtil.getPackage('#sketcher').then((marvin) => {
      this.marvinSketcherInstance = marvin.sketcherInstance;
      this.marvinSketcherInstance.on('molchange', () => {
        this.marvinSketcherInstance.exportStructure('mol').then((mol: any) => {
          // solution and explanation from here: https://stackoverflow.com/a/48528672
          // basically, the marvin callbacks aren't run within angular, so they can't update the scope data
          this.ngZone.run(() => {
             this.molConverter.convertMol(mol);
          });
        });
      });
      this.marvinSketcherInstance.importStructure('mol', this.passedStructure);
      }).catch(err => console.log(err));
*/
    this.structureSetter.structure$.subscribe(res => {
      this.passedStructure = res;
    });
  }
}
