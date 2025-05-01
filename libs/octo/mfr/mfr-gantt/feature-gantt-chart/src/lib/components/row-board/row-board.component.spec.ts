import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowBoardComponent } from './row-board.component';

describe('RowBoardComponent', () => {
  let component: RowBoardComponent;
  let fixture: ComponentFixture<RowBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
