import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskMoreComponent } from './task-more.component';

describe('TaskMoreComponent', () => {
  let component: TaskMoreComponent;
  let fixture: ComponentFixture<TaskMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
