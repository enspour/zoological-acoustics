import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduTableComponent } from './table.component';

describe('TableComponent', () => {
  let component: KuduTableComponent<any>;
  let fixture: ComponentFixture<KuduTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
