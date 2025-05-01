import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkOverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let component: MkOverlayComponent;
  let fixture: ComponentFixture<MkOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
