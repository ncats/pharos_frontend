import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseNoveltyComponent } from './disease-novelty.component';

describe('DiseaseNoveltyComponent', () => {
  let component: DiseaseNoveltyComponent;
  let fixture: ComponentFixture<DiseaseNoveltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseNoveltyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseNoveltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
