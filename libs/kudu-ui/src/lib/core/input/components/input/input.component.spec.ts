import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduInputComponent } from './input.component';

describe('KuduInputComponent', () => {
  let component: KuduInputComponent;
  let fixture: ComponentFixture<KuduInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
