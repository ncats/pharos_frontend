import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesPanelComponent } from './references-panel.component';

describe('ReferencesPanelComponent', () => {
  let component: ReferencesPanelComponent;
  let fixture: ComponentFixture<ReferencesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
