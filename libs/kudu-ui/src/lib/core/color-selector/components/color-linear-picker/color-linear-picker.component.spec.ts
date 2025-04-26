import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduColorLinearPickerComponent } from './color-linear-picker.component';

describe('KuduColorLinearPickerComponent', () => {
  let component: KuduColorLinearPickerComponent;
  let fixture: ComponentFixture<KuduColorLinearPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduColorLinearPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduColorLinearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
