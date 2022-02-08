import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from '@angular/common/http';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-molecular-definition-panel',
  templateUrl: './molecular-definition-panel.component.html',
  styleUrls: ['./molecular-definition-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MolecularDefinitionPanelComponent extends DynamicPanelComponent implements OnInit {
  properties: any;
  /**
   * ligand object
   */
  @Input() ligand: Ligand;


  constructor(
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (this.data && this.data.ligands) {
          this.ligand = this.data.ligands;
          this.loadingComplete();

          this.changeRef.markForCheck();
        }
      });
  }
}
