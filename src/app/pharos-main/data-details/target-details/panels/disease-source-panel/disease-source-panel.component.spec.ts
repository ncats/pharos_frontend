import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseSourceComponent } from './disease-source-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('DiseaseSourceComponent', () => {
  let component: DiseaseSourceComponent;
  let fixture: ComponentFixture<DiseaseSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        GenericTableModule,
        CommonToolsModule,
        ApolloTestingModule,
        RouterTestingModule
      ],
      declarations: [ DiseaseSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSourceComponent);
    component = fixture.componentInstance;
    component.data = {
      loaded: true,
      diseases: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
