import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmedScoreArticleComponent } from './pubmed-score-article.component';

describe('PubmedScoreArticleComponent', () => {
  let component: PubmedScoreArticleComponent;
  let fixture: ComponentFixture<PubmedScoreArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubmedScoreArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubmedScoreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
