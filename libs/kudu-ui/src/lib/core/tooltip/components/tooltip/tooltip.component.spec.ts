import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduTooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: KuduTooltipComponent;
  let fixture: ComponentFixture<KuduTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
