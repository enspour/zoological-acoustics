import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: KuduButtonComponent;
  let fixture: ComponentFixture<KuduButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
