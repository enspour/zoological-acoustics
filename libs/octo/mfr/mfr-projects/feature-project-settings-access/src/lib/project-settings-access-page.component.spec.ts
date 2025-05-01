import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSettingsAccessPageComponent } from './project-settings-access-page.component';

describe('ProjectSettingsAccessPageComponent', () => {
  let component: ProjectSettingsAccessPageComponent;
  let fixture: ComponentFixture<ProjectSettingsAccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSettingsAccessPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSettingsAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
