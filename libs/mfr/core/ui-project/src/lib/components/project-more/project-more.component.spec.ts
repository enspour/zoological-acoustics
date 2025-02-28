import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMoreComponent } from './project-more.component';

describe('ProjectMenuComponent', () => {
  let component: ProjectMoreComponent;
  let fixture: ComponentFixture<ProjectMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
