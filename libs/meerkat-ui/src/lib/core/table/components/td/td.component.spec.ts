import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkTableDataCellComponent } from './td.component';

describe('TdComponent', () => {
  let component: MkTableDataCellComponent;
  let fixture: ComponentFixture<MkTableDataCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkTableDataCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkTableDataCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
