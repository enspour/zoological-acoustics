import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduVirtualScrollComponent } from './virtual-scroll.component';

describe('KuduVirtualScrollComponent', () => {
  let component: KuduVirtualScrollComponent<any, any>;
  let fixture: ComponentFixture<KuduVirtualScrollComponent<any, any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduVirtualScrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
