import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoTermsEvidenceArticleComponent } from './go-terms-evidence-article.component';

describe('GoTermsEvidenceArticleComponent', () => {
  let component: GoTermsEvidenceArticleComponent;
  let fixture: ComponentFixture<GoTermsEvidenceArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoTermsEvidenceArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
