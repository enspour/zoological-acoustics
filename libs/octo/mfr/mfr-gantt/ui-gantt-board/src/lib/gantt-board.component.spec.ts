import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttBoardComponent } from './gantt-board.component';

describe('GanttBoardComponent', () => {
  let component: GanttBoardComponent;
  let fixture: ComponentFixture<GanttBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
