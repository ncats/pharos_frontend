import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LigandHeaderComponent } from './ligand-header.component';
import {TESTLIGAND} from '../../../../../../test/test-ligand';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UnfurlingMetaService} from "../../../../pharos-services/unfurling-meta.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('LigandHeaderComponent', () => {
  let component: LigandHeaderComponent;
  let fixture: ComponentFixture<LigandHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UnfurlingMetaService],
      declarations: [ LigandHeaderComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandHeaderComponent);
    component = fixture.componentInstance;
    component.ligand = TESTLIGAND;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
