import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduToastComponent } from './toast.component';

describe('KuduToastComponent', () => {
  let component: KuduToastComponent;
  let fixture: ComponentFixture<KuduToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
