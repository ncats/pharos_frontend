import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreListButtonComponent } from './explore-list-button.component';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('ExploreListButtonComponent', () => {
  let component: ExploreListButtonComponent;
  let fixture: ComponentFixture<ExploreListButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreListButtonComponent ],
      imports: [
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreListButtonComponent);
    component = fixture.componentInstance;
    component.path = "/diseases";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
