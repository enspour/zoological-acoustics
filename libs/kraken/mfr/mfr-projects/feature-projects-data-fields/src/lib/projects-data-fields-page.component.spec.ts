import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsDataFieldsPageComponent } from './projects-data-fields-page.component';

describe('ProjectsDataFieldsPageComponent', () => {
  let component: ProjectsDataFieldsPageComponent;
  let fixture: ComponentFixture<ProjectsDataFieldsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDataFieldsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsDataFieldsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
