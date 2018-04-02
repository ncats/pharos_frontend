import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneRifPanelComponent } from './gene-rif-panel.component';

describe('GeneRifPanelComponent', () => {
  let component: GeneRifPanelComponent;
  let fixture: ComponentFixture<GeneRifPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneRifPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneRifPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
