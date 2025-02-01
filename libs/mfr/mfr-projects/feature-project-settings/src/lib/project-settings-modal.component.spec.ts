import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSettingsModalComponent } from './project-settings-modal.component';

describe('ProjectSettingsComponent', () => {
  let component: ProjectSettingsModalComponent;
  let fixture: ComponentFixture<ProjectSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSettingsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
