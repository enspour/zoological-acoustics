import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanColumnUnassignedComponent } from './kanban-column-unassigned.component';

describe('KanbanColumnUnassignedComponent', () => {
  let component: KanbanColumnUnassignedComponent;
  let fixture: ComponentFixture<KanbanColumnUnassignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanColumnUnassignedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanColumnUnassignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
