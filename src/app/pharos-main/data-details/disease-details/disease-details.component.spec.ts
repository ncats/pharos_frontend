import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDetailsComponent } from './disease-details.component';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {TESTTARGET} from '../../../../../test/test-target';
import {TESTDISEASE} from '../../../../../test/test-disease';
import {IDG_LEVEL_TOKEN, TargetListPanelComponent} from './target-list-panel/target-list-panel.component';
import {GenericTableComponent} from '../../../tools/generic-table/generic-table.component';
import {GenericTableModule} from '../../../tools/generic-table/generic-table.module';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {TOKENS} from '../../../../config/component-tokens';
import {DiseaseHeaderComponent} from './disease-header/disease-header.component';
import {SharedModule} from '../../../shared/shared.module';

describe('DiseaseDetailsComponent', () => {
  let component: DiseaseDetailsComponent;
  let fixture: ComponentFixture<DiseaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TargetListPanelComponent,
        IdgLevelIndicatorComponent,
        DiseaseHeaderComponent,
        DiseaseDetailsComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        GenericTableModule
      ],
      providers: [
        ComponentInjectorService,
        DataDetailsResolver,
        {provide: TOKENS.DISEASE_DETAILS_COMPONENT, useValue: DiseaseDetailsComponent},
        {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent},
        {provide: TOKENS.TARGET_LIST_PANEL, useValue: TargetListPanelComponent},
        {provide: IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'diseases';
    component.data = ({object: TESTDISEASE, references: []});
    component.disease = TESTDISEASE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
