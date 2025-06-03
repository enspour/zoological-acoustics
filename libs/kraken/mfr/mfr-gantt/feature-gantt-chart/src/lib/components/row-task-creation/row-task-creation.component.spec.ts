import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowTaskCreationComponent } from './row-task-creation.component';

describe('RowTaskCreationComponent', () => {
  let component: RowTaskCreationComponent;
  let fixture: ComponentFixture<RowTaskCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowTaskCreationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowTaskCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
