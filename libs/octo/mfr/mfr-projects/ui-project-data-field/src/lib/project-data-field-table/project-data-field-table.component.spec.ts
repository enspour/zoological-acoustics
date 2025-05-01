import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDataFieldTableComponent } from './project-data-field-table.component';

describe('ProjectDataFieldTableComponent', () => {
  let component: ProjectDataFieldTableComponent;
  let fixture: ComponentFixture<ProjectDataFieldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDataFieldTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDataFieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
