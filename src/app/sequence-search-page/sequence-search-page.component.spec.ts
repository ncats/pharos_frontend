import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSearchPageComponent } from './sequence-search-page.component';
import {SharedModule} from '../shared/shared.module';
import {NcatsHeaderModule} from '../tools/ncats-header/ncats-header.module';

describe('SequenceSearchPageComponent', () => {
  let component: SequenceSearchPageComponent;
  let fixture: ComponentFixture<SequenceSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NcatsHeaderModule,
        SequenceSearchPageComponent
      ],
      imports: [
        SharedModule
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
