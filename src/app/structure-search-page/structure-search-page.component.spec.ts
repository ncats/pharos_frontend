import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureSearchPageComponent } from './structure-search-page.component';

describe('StructureSearchPageComponent', () => {
  let component: StructureSearchPageComponent;
  let fixture: ComponentFixture<StructureSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
