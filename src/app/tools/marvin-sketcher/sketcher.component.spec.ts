import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketcherComponent } from './sketcher.component';
import {MolConverterService} from './services/mol-converter.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StructureSetterService} from './services/structure-setter.service';

describe('SketcherComponent', () => {
  let component: SketcherComponent;
  let fixture: ComponentFixture<SketcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SketcherComponent
      ],
      providers: [
        StructureSetterService,
        MolConverterService
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
