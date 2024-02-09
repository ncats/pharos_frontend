import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {ScriptLoadService} from "../../../../../../pharos-services/script-load.service";

@Component({
  standalone: true,
  imports: [],
  selector: 'pharos-reactome-pathway-browser',
  templateUrl: './reactome-pathway-browser.component.html',
  styleUrls: ['./reactome-pathway-browser.component.scss']
})
export class ReactomePathwayBrowserComponent implements OnInit, OnChanges {

  @Input() reactomeID: string;
  @Input() symbol: string;

  constructor(@Inject(PLATFORM_ID) private platformID: any,
              private scriptLoader: ScriptLoadService) {
  }

  fieldChanged(changes: SimpleChanges, fieldName: string) {
    if (changes[fieldName]) {
      return changes[fieldName].currentValue !== changes[fieldName].previousValue;
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reactomeID && isPlatformBrowser(this.platformID)) {
      this.scriptLoader.loadReactomeScript().then(() => {
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

  ngOnInit(): void {
  }
}
