import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkColorPaletteComponent } from './color-palette.component';

describe('MkPaletteComponent', () => {
  let component: MkColorPaletteComponent;
  let fixture: ComponentFixture<MkColorPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkColorPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkColorPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
