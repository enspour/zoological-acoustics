import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduFlowControlsComponent } from './controls.component';

describe('KuduFlowControlsComponent', () => {
  let component: KuduFlowControlsComponent;
  let fixture: ComponentFixture<KuduFlowControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduFlowControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduFlowControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
