import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSettingsBoardsPageComponent } from './project-settings-boards-page.component';

describe('ProjectSettingsBoardsPageComponent', () => {
  let component: ProjectSettingsBoardsPageComponent;
  let fixture: ComponentFixture<ProjectSettingsBoardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSettingsBoardsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSettingsBoardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
