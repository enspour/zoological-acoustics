import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarSpinComponent } from './calendar-spin.component';

describe('CalendarSpinComponent', () => {
  let component: CalendarSpinComponent;
  let fixture: ComponentFixture<CalendarSpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSpinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
