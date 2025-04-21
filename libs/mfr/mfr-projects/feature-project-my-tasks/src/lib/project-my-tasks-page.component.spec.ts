import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMyTasksPageComponent } from './project-my-tasks-page.component';

describe('ProjectMyTasksComponent', () => {
  let component: ProjectMyTasksPageComponent;
  let fixture: ComponentFixture<ProjectMyTasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMyTasksPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMyTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
