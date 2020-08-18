import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinxDiseaseComponent } from './tinx-disease.component';

describe('TinxComponent', () => {
  let component: TinxDiseaseComponent;
  let fixture: ComponentFixture<TinxDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinxDiseaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinxDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
