import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSummaryPanelComponent } from './level-summary-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {IdgLevelIndicatorComponent} from '../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {TdarkSummaryComponent} from './levels/tdark-summary/tdark-summary.component';
import {TbioSummaryComponent} from './levels/tbio-summary/tbio-summary.component';
import {TchemSummaryComponent} from './levels/tchem-summary/tchem-summary.component';
import {TclinSummaryComponent} from './levels/tclin-summary/tclin-summary.component';
import {TESTTARGET} from '../../../../../../../test/test-target';

describe('LevelSummaryPanelComponent', () => {
  let component: LevelSummaryPanelComponent;
  let fixture: ComponentFixture<LevelSummaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TdarkSummaryComponent,
        TbioSummaryComponent,
        TchemSummaryComponent,
        TclinSummaryComponent,
        LevelSummaryPanelComponent
      ],
      imports: [
        SharedModule,
        CommonToolsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelSummaryPanelComponent);
    component = fixture.componentInstance;
    component.data = TESTTARGET;
    component['target'] = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
