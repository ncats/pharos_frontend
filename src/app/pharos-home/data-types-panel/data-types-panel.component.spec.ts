import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DataTypesPanelComponent} from './data-types-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('DataTypesPanelComponent', () => {
  let component: DataTypesPanelComponent;
  let fixture: ComponentFixture<DataTypesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      BrowserAnimationsModule
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
