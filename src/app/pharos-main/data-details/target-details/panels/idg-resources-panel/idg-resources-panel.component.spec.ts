import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdgResourcesPanelComponent } from './idg-resources-panel.component';

describe('IdgResourcesPanelComponent', () => {
  let component: IdgResourcesPanelComponent;
  let fixture: ComponentFixture<IdgResourcesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdgResourcesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdgResourcesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
