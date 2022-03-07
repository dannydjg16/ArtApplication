import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktaUserComponent } from './okta-user.component';

describe('OktaUserComponent', () => {
  let component: OktaUserComponent;
  let fixture: ComponentFixture<OktaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OktaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OktaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
