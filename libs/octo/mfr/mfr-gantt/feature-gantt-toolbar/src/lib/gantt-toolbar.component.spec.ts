import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttToolbarComponent } from './gantt-toolbar.component';

describe('GanttToolbarComponent', () => {
  let component: GanttToolbarComponent;
  let fixture: ComponentFixture<GanttToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
