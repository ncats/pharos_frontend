import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDevelopmentArticleComponent } from './target-development-article.component';

describe('TargetDevelopmentArticleComponent', () => {
  let component: TargetDevelopmentArticleComponent;
  let fixture: ComponentFixture<TargetDevelopmentArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDevelopmentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
