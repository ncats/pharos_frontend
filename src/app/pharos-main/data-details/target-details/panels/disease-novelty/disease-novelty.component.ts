import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosPoint} from '../../../../../models/pharos-point';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {PackCircleConfig} from "../../../../../tools/visualizations/pack-circle/pack-circle.component";
import {CentralStorageService} from "../../../../../pharos-services/central-storage.service";
import {TourType} from "../../../../../models/tour-type";

@Component({
  selector: 'pharos-disease-novelty',
  templateUrl: './disease-novelty.component.html',
  styleUrls: ['./disease-novelty.component.scss']
})
export class DiseaseNoveltyComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  constructor(
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: any,
    public dynamicServices: DynamicServicesService,
    private centralStorageService: CentralStorageService
  ) {
    super(dynamicServices);
  }

  /**
   * target to display
   */
  @Input() target: Target;

  @Input() targetProps: any;
  tourType = TourType.TINXNovelty;

  focusedTinxDisease: any = {};
  /**
   * tnx data
   */
  tinx: PharosPoint[];


  circlePackConfig: PackCircleConfig = {
    highlightCheck: (d, node) => node.__data__?.data?.oid === d.data?.oid,
    focusedCheck: (d, node) => {
      if (this.focusedTinxDisease) {
        return node.__data__?.data.oid === this.focusedTinxDisease.oid;
      }
      return false;
    },
    circleClick: (event, d, n) => {
      const addDOID = (node: any, map: Map<string, boolean>) => {
        const doid = node?.oid;
        if (doid && doid.length && !map.has(doid)) {
          map.set(doid, true);
          node.children.forEach(child => {
            addDOID(child, map);
          });
        }
      }
      if (this.focusedTinxDisease.oid === d.data.oid) {
        this.centralStorageService.setField('focusedTinxDisease', {});
        this.centralStorageService.setField('selectedTinxDiseases', []);
      } else {
        const doidMap = new Map<string, boolean>();
        addDOID(d.data, doidMap);
        this.centralStorageService.setField('focusedTinxDisease', {oid: d.data.oid, name: d.data.name});
        this.centralStorageService.setField('selectedTinxDiseases', Array.from(doidMap.keys()));
      }
    }
  }


  hasData() {
    return this.target && (this.tinx && this.tinx.length > 0);
  }

  /**
   * subscribe to data changes and generate tree
   */
  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (isPlatformBrowser(this.platformID)) {
          this.target = this.data.targets;
          this.targetProps = this.data.targetsProps;

          if (this.target && this.target.tinx) {
            this.tinx = [];
            this.target.tinx.map(point => {
              if (point.disease) {
                const p: PharosPoint = new PharosPoint({
                  label: point.disease.doid,
                  x: point.novelty,
                  y: point.score,
                  name: point.disease.name
                });
                this.tinx.push(p);
              }
            });
          }

          if (this.hasData()) {
            this.showSection();
          } else {
            this.hideSection();
          }

          this.setterFunction();
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
      });
  }
  /**
   * parse data
   * creates map to reduce duplicate disease names, and adds sources to disease name
   */
  setterFunction(): void {
    this.centralStorageService.focusedTinxDiseaseChanged.subscribe(focusedTinxDisease => {
      this.focusedTinxDisease = focusedTinxDisease;
    })
  }
}


