import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsSettingsPageComponent } from './projects-settings-page.component';

describe('ProjectsSettingsComponent', () => {
  let component: ProjectsSettingsPageComponent;
  let fixture: ComponentFixture<ProjectsSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSettingsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
