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

describe('LigandDetailsComponent', () => {
  let component: LigandDetailsComponent;
  let fixture: ComponentFixture<LigandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StructureViewComponent,
        LigandDetailsComponent
      ],
      providers: [
        DataDetailsResolver,
        LoadingService,
        ComponentInjectorService
      ],
      imports: [
        RouterTestingModule,
        SharedDetailsModule
      ]
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
