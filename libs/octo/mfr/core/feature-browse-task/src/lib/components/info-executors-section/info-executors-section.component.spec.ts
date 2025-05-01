import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoExecutorsSectionComponent } from './info-executors-section.component';

describe('InfoExecutorsSectionComponent', () => {
  let component: InfoExecutorsSectionComponent;
  let fixture: ComponentFixture<InfoExecutorsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoExecutorsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoExecutorsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
