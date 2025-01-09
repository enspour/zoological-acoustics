import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduGlassmorphismDirective } from './glassmorphism.directive';

describe('KuduGlassmorphismDirective', () => {
  let component: KuduGlassmorphismDirective;
  let fixture: ComponentFixture<KuduGlassmorphismDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduGlassmorphismDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduGlassmorphismDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
