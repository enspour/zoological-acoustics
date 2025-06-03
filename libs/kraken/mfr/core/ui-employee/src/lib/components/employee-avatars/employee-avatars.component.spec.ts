import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeAvatarsComponent } from './employee-avatars.component';

describe('EmployeeAvatarsComponent', () => {
  let component: EmployeeAvatarsComponent;
  let fixture: ComponentFixture<EmployeeAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAvatarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
