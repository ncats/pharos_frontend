import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandActivityArticleComponent } from './ligand-activity-article.component';
import {SharedModule} from '../../../../shared/shared.module';
import {MaterialModule} from '../../../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('LigandActivityArticleComponent', () => {
  let component: LigandActivityArticleComponent;
  let fixture: ComponentFixture<LigandActivityArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandActivityArticleComponent ],
      imports: [
        MaterialModule,
        FlexLayoutModule
      ]
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
