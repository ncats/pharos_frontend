import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsBoxComponent } from './node-details-box.component';
import {SharedDetailsModule} from '../../../../../../shared/shared-details.module';
import {TargetCardComponent} from '../../../../../data-list/cards/target-card/target-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {IdgLevelIndicatorComponent} from '../../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {SmrtgraphCoreModule} from 'smrtgraph-core';
import {CommonToolsModule} from '../../../../../../tools/common-tools.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('NodeDetailsBoxComponent', () => {
  let component: NodeDetailsBoxComponent;
  let fixture: ComponentFixture<NodeDetailsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TargetCardComponent,
        NodeDetailsBoxComponent
      ],
      imports: [
        CommonToolsModule,
        RouterTestingModule,
        SharedDetailsModule,
        SmrtgraphCoreModule
      ],
      providers: [

      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
