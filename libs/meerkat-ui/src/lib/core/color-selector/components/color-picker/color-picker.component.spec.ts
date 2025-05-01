import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkColorPickerComponent } from './color-picker.component';

describe('MkColorPickerComponent', () => {
  let component: MkColorPickerComponent;
  let fixture: ComponentFixture<MkColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkColorPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
