import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationDataSourcesArticleComponent } from './association-data-sources-article.component';

describe('AssociationDataSourcesArticleComponent', () => {
  let component: AssociationDataSourcesArticleComponent;
  let fixture: ComponentFixture<AssociationDataSourcesArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationDataSourcesArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationDataSourcesArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
