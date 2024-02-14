import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinxArticleComponent } from './tinx-article.component';
import {SharedModule} from '../../../../shared/shared.module';
import {MaterialModule} from '../../../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('TinxArticleComponent', () => {
  let component: TinxArticleComponent;
  let fixture: ComponentFixture<TinxArticleComponent>;

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
    fixture = TestBed.createComponent(TinxArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
