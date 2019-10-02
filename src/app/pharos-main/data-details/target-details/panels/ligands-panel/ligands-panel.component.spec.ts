import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandsPanelComponent } from './ligands-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PharosPaginatorModule} from '../../../../../tools/pharos-paginator/pharos-paginator.module';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';

describe('LigandsPanelComponent', () => {
  let component: LigandsPanelComponent;
  let fixture: ComponentFixture<LigandsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        PharosPaginatorModule
      ],
      declarations: [
        LigandCardComponent,
        LigandsPanelComponent ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
