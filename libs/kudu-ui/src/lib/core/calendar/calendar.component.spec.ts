import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduCalendarComponent } from './calendar.component';

describe('KuduCalendarComponent', () => {
  let component: KuduCalendarComponent;
  let fixture: ComponentFixture<KuduCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
