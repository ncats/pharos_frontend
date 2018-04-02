import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetHeaderComponent } from './target-header.component';

describe('TargetHeaderComponent', () => {
  let component: TargetHeaderComponent;
  let fixture: ComponentFixture<TargetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
