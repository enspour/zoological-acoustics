import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkMenuByTriggerComponent } from './menu-by-trigger.component';

describe('MkMenuByTriggerComponent', () => {
  let component: MkMenuByTriggerComponent;
  let fixture: ComponentFixture<MkMenuByTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkMenuByTriggerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkMenuByTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
