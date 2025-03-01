import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowTasksUnassignedComponent } from './row-tasks-unassigned.component';

describe('RowTasksUnassignedComponent', () => {
  let component: RowTasksUnassignedComponent;
  let fixture: ComponentFixture<RowTasksUnassignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowTasksUnassignedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowTasksUnassignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
