import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlluminationGraphArticleComponent } from './illumination-graph-article.component';
import {SharedModule} from '../../../../shared/shared.module';

describe('IlluminationGraphArticleComponent', () => {
  let component: IlluminationGraphArticleComponent;
  let fixture: ComponentFixture<IlluminationGraphArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IlluminationGraphArticleComponent
      ],
      imports: [
        SharedModule
      ]
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
