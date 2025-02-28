import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanBoardTabsComponent } from './kanban-board-tabs.component';

describe('KanbanBoardTabsComponent', () => {
  let component: KanbanBoardTabsComponent;
  let fixture: ComponentFixture<KanbanBoardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanBoardTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
