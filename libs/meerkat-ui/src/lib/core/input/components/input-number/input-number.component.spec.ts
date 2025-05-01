import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkInputNumberComponent } from './input-number.component';

describe('MkInputNumberComponent', () => {
  let component: MkInputNumberComponent;
  let fixture: ComponentFixture<MkInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkInputNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
