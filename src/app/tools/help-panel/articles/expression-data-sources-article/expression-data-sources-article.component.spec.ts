import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDataSourcesArticleComponent } from './expression-data-sources-article.component';

describe('ExpressionDataSourcesArticleComponent', () => {
  let component: ExpressionDataSourcesArticleComponent;
  let fixture: ComponentFixture<ExpressionDataSourcesArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionDataSourcesArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDataSourcesArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
