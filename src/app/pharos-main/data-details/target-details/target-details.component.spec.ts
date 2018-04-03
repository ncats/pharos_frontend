import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDetailsComponent } from './target-details.component';

describe('TargetDetailsComponent', () => {
  let component: TargetDetailsComponent;
  let fixture: ComponentFixture<TargetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
