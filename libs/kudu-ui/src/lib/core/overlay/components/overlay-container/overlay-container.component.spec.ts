import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduOverlayContainerComponent } from './overlay-container.component';

describe('OverlayContainerComponent', () => {
  let component: KuduOverlayContainerComponent;
  let fixture: ComponentFixture<KuduOverlayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduOverlayContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduOverlayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
