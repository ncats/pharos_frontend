import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {SharedModule} from '../../../../shared/shared.module';
import {LigandCardComponent} from '../../cards/ligand-card/ligand-card.component';
import {LigandTableComponent} from './ligand-table.component';
import {TOKENS} from '../../../../../config/component-tokens';

@NgModule({
  declarations: [
    LigandCardComponent,
    LigandTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CommonToolsModule
  ],
  providers: [
    {provide: TOKENS.LIGAND_TABLE_COMPONENT, useValue: LigandTableComponent},
  ],
  entryComponents: [
    LigandCardComponent,
    LigandTableComponent
  ],
  exports: [
    LigandCardComponent,
    LigandTableComponent
  ]
})
export class LigandTableModule { }
