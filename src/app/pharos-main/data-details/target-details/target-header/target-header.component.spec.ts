import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetHeaderComponent } from './target-header.component';
import {SharedModule} from '../../../../shared/shared.module';
import {TESTTARGET} from '../../../../../../test/test-target';
import {CommonToolsModule} from '../../../../tools/common-tools.module';

describe('TargetHeaderComponent', () => {
  let component: TargetHeaderComponent;
  let fixture: ComponentFixture<TargetHeaderComponent>;
  const testTarget = TESTTARGET;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonToolsModule,
        SharedModule
      ],
      declarations: [ TargetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetHeaderComponent);
    component = fixture.componentInstance;
    component.target = testTarget;
    fixture.detectChanges();
  });

  it('should create', () => {
  /*  component.target = testTarget;
    fixture.detectChanges();*/
    expect(component).toBeTruthy();
  });
});
