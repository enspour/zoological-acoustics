import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RowExecutorComponent } from './row-executor.component';

describe('RowExecutorComponent', () => {
  let component: RowExecutorComponent;
  let fixture: ComponentFixture<RowExecutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowExecutorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
