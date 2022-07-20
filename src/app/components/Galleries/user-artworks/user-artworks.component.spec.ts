import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArtworksComponent } from './user-artworks.component';

describe('UserArtworksComponent', () => {
  let component: UserArtworksComponent;
  let fixture: ComponentFixture<UserArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserArtworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
