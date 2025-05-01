import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkColorPlanePickerComponent } from './color-plane-picker.component';

describe('ColorPlanePickerComponent', () => {
  let component: MkColorPlanePickerComponent;
  let fixture: ComponentFixture<MkColorPlanePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkColorPlanePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkColorPlanePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
