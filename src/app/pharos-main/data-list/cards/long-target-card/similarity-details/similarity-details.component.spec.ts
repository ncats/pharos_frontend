import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityDetailsComponent } from './similarity-details.component';

describe('SimilarityDetailsComponent', () => {
  let component: SimilarityDetailsComponent;
  let fixture: ComponentFixture<SimilarityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
