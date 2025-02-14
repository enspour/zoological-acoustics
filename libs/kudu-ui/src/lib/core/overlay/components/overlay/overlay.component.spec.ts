import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduOverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let component: KuduOverlayComponent;
  let fixture: ComponentFixture<KuduOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
