import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttTimelineComponent } from './gantt-timeline.component';

describe('GanttTimelineComponent', () => {
  let component: GanttTimelineComponent;
  let fixture: ComponentFixture<GanttTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
