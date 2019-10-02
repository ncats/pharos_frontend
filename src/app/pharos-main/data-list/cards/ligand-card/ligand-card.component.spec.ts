import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandCardComponent } from './ligand-card.component';
import {SharedModule} from '../../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';

describe('LigandCardComponent', () => {
  let component: LigandCardComponent;
  let fixture: ComponentFixture<LigandCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandCardComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        {provide: RouterModule, useClass: RouterTestingModule}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
