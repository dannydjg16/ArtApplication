import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsAuthComponent } from './is-auth.component';

describe('IsAuthComponent', () => {
  let component: IsAuthComponent;
  let fixture: ComponentFixture<IsAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
