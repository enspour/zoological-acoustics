import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduColorPickerComponent } from './color-picker.component';

describe('KuduColorPickerComponent', () => {
  let component: KuduColorPickerComponent;
  let fixture: ComponentFixture<KuduColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduColorPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
