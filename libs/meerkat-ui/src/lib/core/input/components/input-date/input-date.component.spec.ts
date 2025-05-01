import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkInputDateComponent } from './input-date.component';

describe('InputDateComponent', () => {
  let component: MkInputDateComponent;
  let fixture: ComponentFixture<MkInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkInputDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
