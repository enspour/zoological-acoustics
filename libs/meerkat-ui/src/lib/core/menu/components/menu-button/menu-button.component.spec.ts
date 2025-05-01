import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkMenuButtonComponent } from './menu-button.component';

describe('MenuButtonComponent', () => {
  let component: MkMenuButtonComponent;
  let fixture: ComponentFixture<MkMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkMenuButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
