import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduMenuButtonComponent } from './menu-button.component';

describe('MenuButtonComponent', () => {
  let component: KuduMenuButtonComponent;
  let fixture: ComponentFixture<KuduMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduMenuButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
