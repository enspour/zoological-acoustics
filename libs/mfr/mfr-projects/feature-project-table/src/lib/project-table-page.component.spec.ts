import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectTablePageComponent } from './project-table-page.component';

describe('ProjectTablePageComponent', () => {
  let component: ProjectTablePageComponent;
  let fixture: ComponentFixture<ProjectTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTablePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
