import {Component} from '@angular/core';
import {DrugPanelParameters, DrugsLigandsPanelComponent} from './drugs-ligands-panel.component';

/**
 * panel to generically display drugs as a pageable list of drug cards
 */
@Component({
  standalone: true,
  imports: DrugsLigandsPanelComponent.imports,
  selector: 'pharos-drugs-panel',
  templateUrl: './drugs-ligands-panel.component.html',
  styleUrls: ['./drugs-ligands-panel.component.scss']
})
export class DrugsPanelComponent extends DrugsLigandsPanelComponent  {
  params = new DrugPanelParameters(true);
}
