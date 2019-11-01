import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsPanelComponent } from './drugs-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {PharosPaginatorModule} from '../../../../../tools/pharos-paginator/pharos-paginator.module';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {IdgLevelIndicatorComponent} from '../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {MockActivatedRoute} from '../../../../../../../test/mock-activate-route';

describe('DrugsPanelComponent', () => {
  let component: DrugsPanelComponent;
  let fixture: ComponentFixture<DrugsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        GenericTableModule,
        PharosPaginatorModule,
        ApolloTestingModule
      ],
      declarations: [
        LigandCardComponent,
        DrugsPanelComponent,
        IdgLevelIndicatorComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
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
