import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDetailsComponent } from './ligand-details.component';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';

import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterModule} from '@angular/router';
import {TESTTARGET} from '../../../../../test/test-target';
import {TESTLIGAND} from '../../../../../test/test-ligand';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {StructureViewComponent} from '../../../tools/structure-view/structure-view.component';
import {CommonToolsModule} from '../../../tools/common-tools.module';
import {SharedModule} from '../../../shared/shared.module';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TOKENS} from '../../../../config/component-tokens';
import {TargetListPanelComponent} from '../disease-details/target-list-panel/target-list-panel.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {DiseaseDetailsComponent} from '../disease-details/disease-details.component';
import {DiseaseHeaderComponent} from '../disease-details/disease-header/disease-header.component';
import {TargetRelevancePanelComponent} from './panels/target-relevance-panel/target-relevance-panel.component';
import {SynonymsPanelComponent} from './panels/synonyms-panel/synonyms-panel.component';
import {MolecularDefinitionPanelComponent} from './panels/molecular-definition-panel/molecular-definition-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('LigandDetailsComponent', () => {
  let component: LigandDetailsComponent;
  let fixture: ComponentFixture<LigandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TargetRelevancePanelComponent,
        LigandDetailsComponent,
        SynonymsPanelComponent,
        MolecularDefinitionPanelComponent
      ],
      providers: [
        DataDetailsResolver,
        LoadingService,
        ComponentInjectorService,
        {provide: TOKENS.STRUCTURE_VIEW_PANEL, useValue: StructureViewComponent},
        {provide: TOKENS.TARGET_RELEVANCE_PANEL, useValue: TargetRelevancePanelComponent},
        {provide: TOKENS.SYNONYMS_PANEL, useValue: SynonymsPanelComponent},
        {provide: TOKENS.MOLECULAR_DEFINITION_PANEL, useValue: MolecularDefinitionPanelComponent}
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        CommonToolsModule,
        ApolloTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, { set: {
          entryComponents: [
            StructureViewComponent,
            TargetRelevancePanelComponent,
            SynonymsPanelComponent,
            MolecularDefinitionPanelComponent
          ]
        }
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'ligands';
    component.data = ({object: TESTLIGAND, references: []});
    component.ligand = TESTLIGAND;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
