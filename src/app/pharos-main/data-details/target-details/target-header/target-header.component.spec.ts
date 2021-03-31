import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetHeaderComponent } from './target-header.component';
import {SharedModule} from '../../../../shared/shared.module';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../test/test-target';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('TargetHeaderComponent', () => {
  let component: TargetHeaderComponent;
  let fixture: ComponentFixture<TargetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetHeaderComponent ],
      imports: [
        MatDialogModule,
        ApolloTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetHeaderComponent);
    component = fixture.componentInstance;
    component.data = {
      targets: TESTTARGET,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
  /*  component.target = testTarget;
    fixture.detectChanges();*/
    expect(component).toBeTruthy();
  });
});
