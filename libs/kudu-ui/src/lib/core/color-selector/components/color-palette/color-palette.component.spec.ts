import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduColorPaletteComponent } from './color-palette.component';

describe('KuduPaletteComponent', () => {
  let component: KuduColorPaletteComponent;
  let fixture: ComponentFixture<KuduColorPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduColorPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduColorPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
