import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduMenuLinkComponent } from './menu-link.component';

describe('MenuLinkComponent', () => {
  let component: KuduMenuLinkComponent;
  let fixture: ComponentFixture<KuduMenuLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduMenuLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduMenuLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
