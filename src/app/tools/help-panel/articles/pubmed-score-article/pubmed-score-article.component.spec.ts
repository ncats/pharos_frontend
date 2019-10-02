import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmedScoreArticleComponent } from './pubmed-score-article.component';
import {SharedModule} from '../../../../shared/shared.module';

describe('PubmedScoreArticleComponent', () => {
  let component: PubmedScoreArticleComponent;
  let fixture: ComponentFixture<PubmedScoreArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubmedScoreArticleComponent ],
      imports: [
        SharedModule
      ]
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
