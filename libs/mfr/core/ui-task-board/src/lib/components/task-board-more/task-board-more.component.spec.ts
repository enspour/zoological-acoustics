import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskBoardMoreComponent } from './task-board-more.component';

describe('TaskBoardMenuComponent', () => {
  let component: TaskBoardMoreComponent;
  let fixture: ComponentFixture<TaskBoardMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBoardMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
