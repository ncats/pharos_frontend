import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AboutPanelComponent} from './about-panel.component';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('AboutPanelComponent', () => {
  let component: AboutPanelComponent;
  let fixture: ComponentFixture<AboutPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule
      ],
      declarations: [ AboutPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
