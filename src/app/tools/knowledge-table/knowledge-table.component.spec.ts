import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeTableComponent } from './knowledge-table.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';

describe('KnowledgeTableComponent', () => {
  let component: KnowledgeTableComponent;
  let fixture: ComponentFixture<KnowledgeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
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
