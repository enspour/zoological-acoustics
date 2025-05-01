import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkOverlayContainerComponent } from './overlay-container.component';

describe('MkOverlayContainerComponent', () => {
  let component: MkOverlayContainerComponent;
  let fixture: ComponentFixture<MkOverlayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkOverlayContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkOverlayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
