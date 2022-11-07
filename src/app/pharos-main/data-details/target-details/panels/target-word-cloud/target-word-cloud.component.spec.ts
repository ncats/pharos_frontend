import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetWordCloudComponent } from './target-word-cloud.component';

describe('TargetWordCloudComponent', () => {
  let component: TargetWordCloudComponent;
  let fixture: ComponentFixture<TargetWordCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetWordCloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetWordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
