import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanBoardTabComponent } from './kanban-board-tab.component';

describe('KanbanBoardTabComponent', () => {
  let component: KanbanBoardTabComponent;
  let fixture: ComponentFixture<KanbanBoardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanBoardTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
