import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddArtTypeComponent } from './add-art-type.component';

describe('AddArtTypeComponent', () => {
  let component: AddArtTypeComponent;
  let fixture: ComponentFixture<AddArtTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArtTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
