import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduExpandedComponent } from './expanded.component';

describe('KuduExpandedComponent', () => {
  let component: KuduExpandedComponent;
  let fixture: ComponentFixture<KuduExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduExpandedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
