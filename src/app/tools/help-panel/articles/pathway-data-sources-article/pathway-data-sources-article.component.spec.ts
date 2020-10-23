import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayDataSourcesArticleComponent } from './pathway-data-sources-article.component';

describe('PathwayDataSourcesArticleComponent', () => {
  let component: PathwayDataSourcesArticleComponent;
  let fixture: ComponentFixture<PathwayDataSourcesArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayDataSourcesArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayDataSourcesArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
