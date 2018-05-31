import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssayPanelComponent } from './assay-panel.component';

describe('AssayPanelComponent', () => {
  let component: AssayPanelComponent;
  let fixture: ComponentFixture<AssayPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssayPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
