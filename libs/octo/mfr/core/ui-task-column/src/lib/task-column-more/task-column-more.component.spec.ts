import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskColumnMoreComponent } from './task-column-more.component';

describe('TaskColumnMoreComponent', () => {
  let component: TaskColumnMoreComponent;
  let fixture: ComponentFixture<TaskColumnMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskColumnMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskColumnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
