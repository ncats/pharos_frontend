import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationScoreArticleComponent } from './association-score-article.component';
import {SharedModule} from '../../../../shared/shared.module';

describe('AssociationScoreArticleComponent', () => {
  let component: AssociationScoreArticleComponent;
  let fixture: ComponentFixture<AssociationScoreArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AssociationScoreArticleComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationScoreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
