import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeContactsPageComponent } from './employee-contacts-page.component';

describe('EmployeeContactsComponent', () => {
  let component: EmployeeContactsPageComponent;
  let fixture: ComponentFixture<EmployeeContactsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeContactsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
