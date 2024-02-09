import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {DataProperty} from '../../../../../tools/generic-table/components/property-display/data-property';
import { Facet } from 'src/app/models/facet';
import {MolChangeService} from '../../../../../tools/marvin-sketcher/services/mol-change.service';
import {Router} from '@angular/router';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {StructureViewComponent} from '../../../../../tools/structure-view/structure-view.component';
import {
  PropertyDisplayComponent
} from '../../../../../tools/generic-table/components/property-display/property-display.component';
import {CommunityDataPanelComponent} from '../../../../../tools/community-data-panel/community-data-panel.component';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, ScrollspyDirective, ComponentHeaderComponent, MatTooltip,
    MatButtonModule, MatIconModule, StructureViewComponent, PropertyDisplayComponent, CommunityDataPanelComponent],
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
