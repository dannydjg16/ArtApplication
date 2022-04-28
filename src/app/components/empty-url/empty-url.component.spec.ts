import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyURLComponent } from './empty-url.component';

describe('EmptyURLComponent', () => {
  let component: EmptyURLComponent;
  let fixture: ComponentFixture<EmptyURLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyURLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
