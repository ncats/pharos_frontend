import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDevelopmentArticleComponent } from './target-development-article.component';
import {SharedModule} from '../../../../shared/shared.module';
import {MaterialModule} from '../../../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('TargetDevelopmentArticleComponent', () => {
  let component: TargetDevelopmentArticleComponent;
  let fixture: ComponentFixture<TargetDevelopmentArticleComponent>;

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
    fixture = TestBed.createComponent(TargetDevelopmentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
