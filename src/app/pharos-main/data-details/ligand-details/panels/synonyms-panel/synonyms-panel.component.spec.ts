import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsPanelComponent } from './synonyms-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';

describe('SynonymsPanelComponent', () => {
  let component: SynonymsPanelComponent;
  let fixture: ComponentFixture<SynonymsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymsPanelComponent ],
      imports: [
        SharedModule,
        GenericTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
