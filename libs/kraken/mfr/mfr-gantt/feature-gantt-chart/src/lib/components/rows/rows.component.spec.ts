import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowsComponent } from './rows.component';

describe('RowsComponent', () => {
  let component: RowsComponent;
  let fixture: ComponentFixture<RowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
