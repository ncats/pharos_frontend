import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlluminationGraphArticleComponent } from './illumination-graph-article.component';
import {SharedModule} from '../../../../shared/shared.module';
import {MaterialModule} from '../../../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('IlluminationGraphArticleComponent', () => {
  let component: IlluminationGraphArticleComponent;
  let fixture: ComponentFixture<IlluminationGraphArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FlexLayoutModule
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
