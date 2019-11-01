import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseHeaderComponent } from './disease-header.component';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('DiseaseHeaderComponent', () => {
  let component: DiseaseHeaderComponent;
  let fixture: ComponentFixture<DiseaseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseHeaderComponent ],
      imports: [
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
