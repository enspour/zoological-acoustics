import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuartersWithYearsComponent } from './quarters-with-year.component';

describe('QuartersComponent', () => {
  let component: QuartersWithYearsComponent;
  let fixture: ComponentFixture<QuartersWithYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuartersWithYearsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuartersWithYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
