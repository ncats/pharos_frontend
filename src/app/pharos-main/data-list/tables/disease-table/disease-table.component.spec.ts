import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiseaseTableComponent} from './disease-table.component';
import {SharedModule} from '../../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';
import {PharosPaginatorModule} from '../../../../tools/pharos-paginator/pharos-paginator.module';
import {GenericTableModule} from '../../../../tools/generic-table/generic-table.module';

describe('DiseaseTableComponent', () => {
  let component: DiseaseTableComponent;
  let fixture: ComponentFixture<DiseaseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        GenericTableModule
      ],
      providers: [
        PharosApiService
      ],
      declarations: [ DiseaseTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
