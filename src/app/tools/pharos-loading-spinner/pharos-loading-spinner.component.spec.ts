import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosLoadingSpinnerComponent } from './pharos-loading-spinner.component';

describe('PharosLoadingSpinnerComponent', () => {
  let component: PharosLoadingSpinnerComponent;
  let fixture: ComponentFixture<PharosLoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
