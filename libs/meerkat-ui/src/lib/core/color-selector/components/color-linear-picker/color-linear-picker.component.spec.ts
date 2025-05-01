import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkColorLinearPickerComponent } from './color-linear-picker.component';

describe('MkColorLinearPickerComponent', () => {
  let component: MkColorLinearPickerComponent;
  let fixture: ComponentFixture<MkColorLinearPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkColorLinearPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkColorLinearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
