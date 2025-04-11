import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMyTasksComponent } from './project-my-tasks.component';

describe('ProjectMyTasksComponent', () => {
  let component: ProjectMyTasksComponent;
  let fixture: ComponentFixture<ProjectMyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMyTasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
