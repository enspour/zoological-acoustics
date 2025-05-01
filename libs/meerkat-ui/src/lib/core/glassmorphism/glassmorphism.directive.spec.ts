import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkGlassmorphismDirective } from './glassmorphism.directive';

describe('MkGlassmorphismDirective', () => {
  let component: MkGlassmorphismDirective;
  let fixture: ComponentFixture<MkGlassmorphismDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkGlassmorphismDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(MkGlassmorphismDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
