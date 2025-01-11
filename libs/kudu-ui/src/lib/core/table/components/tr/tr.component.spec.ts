import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduTableRowComponent } from './tr.component';

describe('TrComponent', () => {
  let component: KuduTableRowComponent;
  let fixture: ComponentFixture<KuduTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTableRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
