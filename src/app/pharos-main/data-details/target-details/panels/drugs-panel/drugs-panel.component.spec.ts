import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsPanelComponent } from './drugs-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {PharosPaginatorModule} from '../../../../../tools/pharos-paginator/pharos-paginator.module';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('DrugsPanelComponent', () => {
  let component: DrugsPanelComponent;
  let fixture: ComponentFixture<DrugsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        GenericTableModule,
        PharosPaginatorModule
      ],
      declarations: [
        LigandCardComponent,
        DrugsPanelComponent
      ],
      providers: [
        {provide: RouterModule, useClass: RouterTestingModule}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
