import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseHeaderComponent } from './disease-header.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {TESTTARGET} from "../../../../../../test/test-target";
import {UnfurlingMetaService} from "../../../../pharos-services/unfurling-meta.service";

describe('DiseaseHeaderComponent', () => {
  let component: DiseaseHeaderComponent;
  let fixture: ComponentFixture<DiseaseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UnfurlingMetaService],
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
    component.data.diseases = TESTTARGET.diseases[0];
    component.disease = TESTTARGET.diseases[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
