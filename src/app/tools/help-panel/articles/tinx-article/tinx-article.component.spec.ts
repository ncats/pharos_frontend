import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinxArticleComponent } from './tinx-article.component';

describe('TinxArticleComponent', () => {
  let component: TinxArticleComponent;
  let fixture: ComponentFixture<TinxArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinxArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinxArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
