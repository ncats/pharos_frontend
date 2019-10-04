import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatamogramComponent } from './anatamogram.component';
import {SharedModule} from '../../shared/shared.module';
import {AnatomogramImageComponent} from './anatomogram-image/anatomogram-image.component';
import {AnatamogramHoverService} from './anatamogram-hover.service';

describe('AnatamogramComponent', () => {
  let component: AnatamogramComponent;
  let fixture: ComponentFixture<AnatamogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnatamogramComponent,
        AnatomogramImageComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        AnatamogramHoverService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatamogramComponent);
    component = fixture.componentInstance;
    component.species = 'homo_sapiens';
    component.details = 'brain';
    component.tissues = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
