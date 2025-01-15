import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InviteEmployeeModalComponent } from './invite-employee-modal.component';

describe('InviteEmployeeModalComponent', () => {
  let component: InviteEmployeeModalComponent;
  let fixture: ComponentFixture<InviteEmployeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteEmployeeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteEmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
