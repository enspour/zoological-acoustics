import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanTaskCreationComponent } from './kanban-task-creation.component';

describe('KanbanTaskCreationComponent', () => {
  let component: KanbanTaskCreationComponent;
  let fixture: ComponentFixture<KanbanTaskCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanTaskCreationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanTaskCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
