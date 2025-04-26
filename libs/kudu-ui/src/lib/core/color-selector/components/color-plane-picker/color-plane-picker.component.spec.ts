import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduColorPlanePickerComponent } from './color-plane-picker.component';

describe('ColorPlanePickerComponent', () => {
  let component: KuduColorPlanePickerComponent;
  let fixture: ComponentFixture<KuduColorPlanePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduColorPlanePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduColorPlanePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
