import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoAuthNavComponent } from './no-auth-nav.component';

describe('NoAuthNavComponent', () => {
  let component: NoAuthNavComponent;
  let fixture: ComponentFixture<NoAuthNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAuthNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
