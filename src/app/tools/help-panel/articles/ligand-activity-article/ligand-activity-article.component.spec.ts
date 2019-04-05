import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandActivityArticleComponent } from './ligand-activity-article.component';

describe('LigandActivityArticleComponent', () => {
  let component: LigandActivityArticleComponent;
  let fixture: ComponentFixture<LigandActivityArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandActivityArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandActivityArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
