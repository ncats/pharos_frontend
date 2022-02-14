import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {DataProperty} from '../../../../../tools/generic-table/components/property-display/data-property';
import { Facet } from 'src/app/models/facet';
import {MolChangeService} from '../../../../../tools/marvin-sketcher/services/mol-change.service';
import {Router} from '@angular/router';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-ligand-details',
  templateUrl: './ligand-details.component.html',
  styleUrls: ['./ligand-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  Facet = Facet;
  /**
   * ligand object
   */
  @Input() ligand: Ligand;

  constructor(private changeRef: ChangeDetectorRef,
              private molChangeService: MolChangeService,
              private router: Router,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }
  synonymList: DataProperty[];
  /**
   * set data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (this.data && this.data.ligands) {
          this.ligand = this.data.ligands;
          this.synonymList = this.ligand.synonymLabels();
          this.loadingComplete();
          this.changeRef.markForCheck();
        }
      });
  }

  getTooltipProp(prop: DataProperty){
    prop.tooltip = this.getTooltip(prop.label);
    return prop;
  }

  goToStructureSearch(){
    this.molChangeService.updateSmiles(this.ligand.smiles, 'edit');
    this.molChangeService.updateSearchType('sim');
    this.router.navigate(['/structure']);
  }
}
