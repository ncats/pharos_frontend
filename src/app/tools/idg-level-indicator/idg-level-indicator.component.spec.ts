import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdgLevelIndicatorComponent } from './idg-level-indicator.component';

describe('IdgLevelIndicatorComponent', () => {
  let component: IdgLevelIndicatorComponent;
  let fixture: ComponentFixture<IdgLevelIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdgLevelIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdgLevelIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
