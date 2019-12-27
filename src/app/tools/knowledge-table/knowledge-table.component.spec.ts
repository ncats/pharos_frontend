import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeTableComponent } from './knowledge-table.component';
import {SharedModule} from '../../shared/shared.module';
import {GenericTableModule} from '../generic-table/generic-table.module';

describe('KnowledgeTableComponent', () => {
  let component: KnowledgeTableComponent;
  let fixture: ComponentFixture<KnowledgeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KnowledgeTableComponent
      ],
      imports: [
        SharedModule,
        GenericTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeTableComponent);
    component = fixture.componentInstance;
    component.data = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
