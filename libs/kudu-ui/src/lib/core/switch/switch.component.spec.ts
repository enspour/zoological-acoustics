import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduSwitchComponent } from './switch.component';

describe('KuduSwitchComponent', () => {
  let component: KuduSwitchComponent;
  let fixture: ComponentFixture<KuduSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
