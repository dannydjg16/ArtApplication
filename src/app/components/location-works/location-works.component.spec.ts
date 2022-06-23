import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWorksComponent } from './location-works.component';

describe('LocationWorksComponent', () => {
  let component: LocationWorksComponent;
  let fixture: ComponentFixture<LocationWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
