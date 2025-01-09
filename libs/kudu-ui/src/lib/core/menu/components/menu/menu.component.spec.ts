import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduMenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: KuduMenuComponent;
  let fixture: ComponentFixture<KuduMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
