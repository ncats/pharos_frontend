import {HttpClientTestingModule} from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AngularFireModule} from "@angular/fire/compat";
import {RouterTestingModule} from "@angular/router/testing";
import {ApolloModule} from "apollo-angular";
import {COMMON_CONFIG} from "../../../../../test/test-config";
import {SharedModule} from "../../../shared/shared.module";

import { SequenceAlignmentsComponent } from './sequence-alignments.component';

describe('SequenceAlignmentsComponent', () => {
  let component: SequenceAlignmentsComponent;
  let fixture: ComponentFixture<SequenceAlignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceAlignmentsComponent ],
      imports: [
        ApolloModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
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
