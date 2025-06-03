import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthsWithYearComponent } from './months-with-year.component';

describe('MonthsWithYearComponent', () => {
  let component: MonthsWithYearComponent;
  let fixture: ComponentFixture<MonthsWithYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthsWithYearComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthsWithYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
