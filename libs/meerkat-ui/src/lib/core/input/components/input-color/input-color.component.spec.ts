import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkInputColorComponent } from './input-color.component';

describe('MkInputColorComponent', () => {
  let component: MkInputColorComponent;
  let fixture: ComponentFixture<MkInputColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkInputColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkInputColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
