import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationExplanationComponent } from './classification-explanation.component';

describe('ClassificationExplanationComponent', () => {
  let component: ClassificationExplanationComponent;
  let fixture: ComponentFixture<ClassificationExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
