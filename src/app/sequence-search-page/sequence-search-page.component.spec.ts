import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSearchPageComponent } from './sequence-search-page.component';
import {SharedModule} from '../shared/shared.module';
import {NcatsHeaderModule} from '../tools/ncats-header/ncats-header.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('SequenceSearchPageComponent', () => {
  let component: SequenceSearchPageComponent;
  let fixture: ComponentFixture<SequenceSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SequenceSearchPageComponent
      ],
      imports: [
        NcatsHeaderModule,
        SharedModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
