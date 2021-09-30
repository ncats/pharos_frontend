import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeHeaderComponent } from './analyze-header.component';

describe('AnalyzeHeaderComponent', () => {
  let component: AnalyzeHeaderComponent;
  let fixture: ComponentFixture<AnalyzeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyzeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
