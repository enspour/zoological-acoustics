import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkCalendarComponent } from './calendar.component';

describe('MkCalendarComponent', () => {
  let component: MkCalendarComponent;
  let fixture: ComponentFixture<MkCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
