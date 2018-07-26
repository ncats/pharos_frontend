import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeTableComponent } from './knowledge-table.component';

describe('KnowledgeTableComponent', () => {
  let component: KnowledgeTableComponent;
  let fixture: ComponentFixture<KnowledgeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
