import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoDeadlineSectionComponent } from './info-deadline-section.component';

describe('InfoDeadlineSectionComponent', () => {
  let component: InfoDeadlineSectionComponent;
  let fixture: ComponentFixture<InfoDeadlineSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDeadlineSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoDeadlineSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
