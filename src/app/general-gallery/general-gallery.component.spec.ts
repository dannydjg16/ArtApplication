import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralGalleryComponent } from './general-gallery.component';

describe('GeneralGalleryComponent', () => {
  let component: GeneralGalleryComponent;
  let fixture: ComponentFixture<GeneralGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
