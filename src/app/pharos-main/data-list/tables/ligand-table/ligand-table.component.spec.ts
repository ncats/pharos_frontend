import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandTableComponent } from './ligand-table.component';
import {CommonToolsModule} from '../../../../tools/common-tools.module';
import {SharedModule} from '../../../../shared/shared.module';
import {LigandCardComponent} from '../../cards/ligand-card/ligand-card.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('LigandTableComponent', () => {
  let component: LigandTableComponent;
  let fixture: ComponentFixture<LigandTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LigandTableComponent,
        LigandCardComponent
      ],
      imports: [
        RouterTestingModule,
        CommonToolsModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
