import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduMenuGroupComponent } from './menu-group.component';

describe('MenuGroupComponent', () => {
  let component: KuduMenuGroupComponent;
  let fixture: ComponentFixture<KuduMenuGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduMenuGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduMenuGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
