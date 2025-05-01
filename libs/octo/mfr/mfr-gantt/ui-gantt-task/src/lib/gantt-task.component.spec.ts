import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttTaskComponent } from './gantt-task.component';

describe('GanttTaskComponent', () => {
  let component: GanttTaskComponent;
  let fixture: ComponentFixture<GanttTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
