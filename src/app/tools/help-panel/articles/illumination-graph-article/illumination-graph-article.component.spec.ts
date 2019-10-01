import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlluminationGraphArticleComponent } from './illumination-graph-article.component';

describe('IlluminationGraphArticleComponent', () => {
  let component: IlluminationGraphArticleComponent;
  let fixture: ComponentFixture<IlluminationGraphArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlluminationGraphArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlluminationGraphArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
