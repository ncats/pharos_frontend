import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'pharos-reactome-pathway-browser',
  templateUrl: './reactome-pathway-browser.component.html',
  styleUrls: ['./reactome-pathway-browser.component.scss']
})
export class ReactomePathwayBrowserComponent implements OnInit, OnChanges {

  @Input() reactomeID: string;
  @Input() symbol: string;

  constructor(@Inject(PLATFORM_ID) private platformID: any,
              @Inject(DOCUMENT) private _document: Document) {
  }

  fieldChanged(changes: SimpleChanges, fieldName: string) {
    if (changes[fieldName]) {
      return changes[fieldName].currentValue !== changes[fieldName].previousValue;
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reactomeID && isPlatformBrowser(this.platformID)) {
      this.loadScript().then(() => {
        // @ts-ignore
        if (this.fieldChanged(changes, 'reactomeID') || this.fieldChanged(changes, 'symbol')) {
          const that = this;
          // @ts-ignore
          const diagram = Reactome.Diagram.create({
            placeHolder: 'diagramHolder',
            width: 900,
            height: '400'
          });
          diagram.loadDiagram(this.reactomeID);
          diagram.onDiagramLoaded((loaded) => {
            if (loaded === that.reactomeID) {
              diagram.resetFlaggedItems();
              diagram.selectItem(that.reactomeID);
              diagram.flagItems(that.symbol);
            }
          });
        }
      });
    }
  }

  loadScript() {
    return new Promise((resolve, reject) => {
      const className = 'reactome-script';
      const existingScripts = this._document.head.getElementsByClassName(className)
      if (existingScripts.length) {
        resolve(true);
      } else {
        const script = this._document.createElement('script');
        script.setAttribute('class', className);
        script.type = 'text/javascript';
        script.src = 'https://idg.reactome.org/DiagramJs/diagram/diagram.nocache.js';
        script.onerror = (err) => {
          console.log('Error loading Reactome widget');
          console.log(err);
          reject('Error loading Reactome widget');
        }
        script.onload = () => {
          const intervalID = setInterval(() => {
            // @ts-ignore
            if (window.Reactome) {
              resolve(true);
              clearInterval(intervalID);
            }
          }, 150);
        };
        this._document.head.appendChild(script);
      }
    });
  }

  ngOnInit(): void {
  }
}
