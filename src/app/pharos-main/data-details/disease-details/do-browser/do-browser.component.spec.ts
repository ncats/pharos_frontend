import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DoBrowserComponent } from './do-browser.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {TESTTARGET} from "../../../../../../test/test-target";

describe('DoBrowserComponent', () => {
  let component: DoBrowserComponent;
  let fixture: ComponentFixture<DoBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoBrowserComponent ],
      imports: [
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoBrowserComponent);
    component = fixture.componentInstance;
    component.data.diseases = TESTTARGET.diseases[0];
    component.disease = TESTTARGET.diseases[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
