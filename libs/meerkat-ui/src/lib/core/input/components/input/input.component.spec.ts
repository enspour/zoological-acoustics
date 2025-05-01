import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkInputComponent } from './input.component';

describe('MkInputComponent', () => {
  let component: MkInputComponent;
  let fixture: ComponentFixture<MkInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
