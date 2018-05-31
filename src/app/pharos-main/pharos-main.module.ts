import { NgModule } from '@angular/core';
import {PharosMainRoutingModule} from './pharos-main-routing.module';
import { AssayPanelComponent } from './data-details/target-details/panels/assay-panel/assay-panel.component';
import { LigandsPanelComponent } from './data-details/target-details/panels/ligands-panel/ligands-panel.component';

@NgModule({
  imports: [
    PharosMainRoutingModule
  ],
  declarations: []
})
export class PharosMainModule { }
