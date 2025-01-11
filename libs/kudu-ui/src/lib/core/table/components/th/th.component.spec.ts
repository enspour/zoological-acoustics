import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduTableHeaderComponent } from './th.component';

describe('ThComponent', () => {
  let component: KuduTableHeaderComponent;
  let fixture: ComponentFixture<KuduTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTableHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
