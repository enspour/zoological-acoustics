import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSettingsGeneralPageComponent } from './project-settings-general-page.component';

describe('ProjectSettingsGeneralPageComponent', () => {
  let component: ProjectSettingsGeneralPageComponent;
  let fixture: ComponentFixture<ProjectSettingsGeneralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSettingsGeneralPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSettingsGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
