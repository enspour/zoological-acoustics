import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduDatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let component: KuduDatepickerComponent;
  let fixture: ComponentFixture<KuduDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
