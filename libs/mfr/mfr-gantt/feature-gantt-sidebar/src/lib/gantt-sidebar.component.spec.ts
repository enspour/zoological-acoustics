import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttSidebarComponent } from './gantt-sidebar.component';

describe('GanttSidebarComponent', () => {
  let component: GanttSidebarComponent;
  let fixture: ComponentFixture<GanttSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
