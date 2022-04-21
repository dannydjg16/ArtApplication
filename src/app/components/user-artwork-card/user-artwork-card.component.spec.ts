import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArtworkCardComponent } from './user-artwork-card.component';

describe('UserArtworkCardComponent', () => {
  let component: UserArtworkCardComponent;
  let fixture: ComponentFixture<UserArtworkCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserArtworkCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserArtworkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
