import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkFlowControlsComponent } from './controls.component';

describe('MkFlowControlsComponent', () => {
  let component: MkFlowControlsComponent;
  let fixture: ComponentFixture<MkFlowControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkFlowControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkFlowControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
