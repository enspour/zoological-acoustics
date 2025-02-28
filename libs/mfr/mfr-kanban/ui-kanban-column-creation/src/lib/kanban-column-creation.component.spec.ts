import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanColumnCreationComponent } from './kanban-column-creation.component';

describe('KanbanColumnCreationComponent', () => {
  let component: KanbanColumnCreationComponent;
  let fixture: ComponentFixture<KanbanColumnCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanColumnCreationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanColumnCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
