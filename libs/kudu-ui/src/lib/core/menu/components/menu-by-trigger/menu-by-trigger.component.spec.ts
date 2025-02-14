import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduMenuByTriggerComponent } from './menu-by-trigger.component';

describe('KuduMenuByTriggerComponent', () => {
  let component: KuduMenuByTriggerComponent;
  let fixture: ComponentFixture<KuduMenuByTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduMenuByTriggerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduMenuByTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
