import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSettingsWorkflowsPageComponent } from './project-settings-workflows-page.component';

describe('ProjectSettingsWorkflowsPageComponent', () => {
  let component: ProjectSettingsWorkflowsPageComponent;
  let fixture: ComponentFixture<ProjectSettingsWorkflowsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSettingsWorkflowsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSettingsWorkflowsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
