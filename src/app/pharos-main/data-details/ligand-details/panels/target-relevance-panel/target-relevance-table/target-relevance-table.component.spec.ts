import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetRelevanceTableComponent } from './target-relevance-table.component';

describe('TargetRelevanceTableComponent', () => {
  let component: TargetRelevanceTableComponent;
  let fixture: ComponentFixture<TargetRelevanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetRelevanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetRelevanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
