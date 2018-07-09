import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsPanelComponent } from './synonyms-panel.component';

describe('SynonymsPanelComponent', () => {
  let component: SynonymsPanelComponent;
  let fixture: ComponentFixture<SynonymsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
