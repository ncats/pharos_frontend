import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LigandTableComponent} from './ligand-table.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {PageData} from '../../../../models/page-data';
import {TESTLIGAND} from '../../../../../../test/test-ligand';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LigandTableComponent', () => {
  let component: LigandTableComponent;
  let fixture: ComponentFixture<LigandTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandTableComponent);
    component = fixture.componentInstance;
    component.pageData = new PageData({});
    component.data = {
      ligands: [TESTLIGAND]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
