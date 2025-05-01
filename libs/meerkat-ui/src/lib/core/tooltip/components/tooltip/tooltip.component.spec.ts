import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkTooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: MkTooltipComponent;
  let fixture: ComponentFixture<MkTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
