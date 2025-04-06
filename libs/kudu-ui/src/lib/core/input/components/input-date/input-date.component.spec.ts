import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduInputDateComponent } from './input-date.component';

describe('InputDateComponent', () => {
  let component: KuduInputDateComponent;
  let fixture: ComponentFixture<KuduInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduInputDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
