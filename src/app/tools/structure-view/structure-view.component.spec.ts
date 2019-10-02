import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureViewComponent } from './structure-view.component';
import {PharosProperty} from '../../models/pharos-property';

describe('StructureViewComponent', () => {
  let component: StructureViewComponent;
  let fixture: ComponentFixture<StructureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureViewComponent);
    component = fixture.componentInstance;
    component.data = new PharosProperty({term: 'ccccc1c'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
