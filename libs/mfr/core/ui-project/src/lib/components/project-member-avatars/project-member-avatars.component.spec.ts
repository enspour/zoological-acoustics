import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMemberAvatarsComponent } from './project-member-avatars.component';

describe('ProjectMemberAvatarsComponent', () => {
  let component: ProjectMemberAvatarsComponent;
  let fixture: ComponentFixture<ProjectMemberAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberAvatarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMemberAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
