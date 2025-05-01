import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: MkButtonComponent;
  let fixture: ComponentFixture<MkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
