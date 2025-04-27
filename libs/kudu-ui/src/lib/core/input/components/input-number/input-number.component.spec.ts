import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduInputNumberComponent } from './input-number.component';

describe('KuduInputNumberComponent', () => {
  let component: KuduInputNumberComponent;
  let fixture: ComponentFixture<KuduInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduInputNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
