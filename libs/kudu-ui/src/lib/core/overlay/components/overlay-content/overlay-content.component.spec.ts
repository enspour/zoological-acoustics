import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduOverlayContentComponent } from './overlay-content.component';

describe('OverlayContentComponent', () => {
  let component: KuduOverlayContentComponent;
  let fixture: ComponentFixture<KuduOverlayContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduOverlayContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduOverlayContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
