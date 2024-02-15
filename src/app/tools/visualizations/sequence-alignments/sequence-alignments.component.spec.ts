import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ApolloTestingModule} from 'apollo-angular/testing'; import {COMMON_CONFIG} from '../../../../../test/test-config';

import { SequenceAlignmentsComponent } from './sequence-alignments.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SequenceAlignmentsComponent', () => {
  let component: SequenceAlignmentsComponent;
  let fixture: ComponentFixture<SequenceAlignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceAlignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
