import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMemberTableComponent } from './project-member-table.component';

describe('ProjectMemberTableComponent', () => {
  let component: ProjectMemberTableComponent;
  let fixture: ComponentFixture<ProjectMemberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMemberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
