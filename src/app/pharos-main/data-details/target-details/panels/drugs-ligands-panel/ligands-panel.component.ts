import {Component} from '@angular/core';
import {DrugPanelParameters, DrugsLigandsPanelComponent} from './drugs-ligands-panel.component';

/**
 * panel to generically display ligands as a pageable list of ligand cards
 */
@Component({
  standalone: true,
  imports: DrugsLigandsPanelComponent.imports,
  selector: 'pharos-ligands-panel',
  templateUrl: './drugs-ligands-panel.component.html',
  styleUrls: ['./drugs-ligands-panel.component.scss']
})
export class LigandsPanelComponent extends DrugsLigandsPanelComponent {
  params = new DrugPanelParameters(false);
}
