import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayMarkerComponent } from './today-marker.component';

describe('TodaylineComponent', () => {
  let component: TodayMarkerComponent;
  let fixture: ComponentFixture<TodayMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayMarkerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
