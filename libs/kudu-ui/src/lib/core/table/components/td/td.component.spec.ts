import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduTableDataCellComponent } from './td.component';

describe('TdComponent', () => {
  let component: KuduTableDataCellComponent;
  let fixture: ComponentFixture<KuduTableDataCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTableDataCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTableDataCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
