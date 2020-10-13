import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPIDataSourcesArticleComponent } from './ppidata-sources-article.component';

describe('PPIDataSourcesArticleComponent', () => {
  let component: PPIDataSourcesArticleComponent;
  let fixture: ComponentFixture<PPIDataSourcesArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPIDataSourcesArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPIDataSourcesArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
