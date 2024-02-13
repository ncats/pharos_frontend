import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {ScriptLoadService} from '../../../../../pharos-services/script-load.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    TargetPanelBaseComponent, MatCardModule
  ],
  selector: 'pharos-interacting-pathways-component',
  templateUrl: './interacting-pathways.component.html',
  styleUrls: ['./interacting-pathways.component.scss']
})
export class InteractingPathwaysComponent extends TargetPanelBaseComponent implements AfterViewInit {
  @ViewChild('interactorElement', {static: true}) interactorElement: ElementRef;

  constructor(
    changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService,
    private scriptLoader: ScriptLoadService
  ) {
      super(changeRef, dynamicServices);
  }

  ngAfterViewInit() {
    this.scriptLoader.loadReactomeInteractingPathwaysScript();
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.interactorElement && this.interactorElement.nativeElement) {
          this.interactorElement.nativeElement.setAttribute('term', this.target.preferredSymbol);
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
      });
  }
}
