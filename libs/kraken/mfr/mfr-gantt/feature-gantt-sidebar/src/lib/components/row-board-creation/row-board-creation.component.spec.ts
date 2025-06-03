import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowBoardCreationComponent } from './row-board-creation.component';

describe('RowBoardCreationComponent', () => {
  let component: RowBoardCreationComponent;
  let fixture: ComponentFixture<RowBoardCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowBoardCreationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowBoardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
