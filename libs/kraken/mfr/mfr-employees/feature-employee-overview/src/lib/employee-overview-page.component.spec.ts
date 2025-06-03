import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeOverviewPageComponent } from './employee-overview-page.component';

describe('EmployeeOverviewPageComponent', () => {
  let component: EmployeeOverviewPageComponent;
  let fixture: ComponentFixture<EmployeeOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeOverviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
