import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkMenuLinkComponent } from './menu-link.component';

describe('MenuLinkComponent', () => {
  let component: MkMenuLinkComponent;
  let fixture: ComponentFixture<MkMenuLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkMenuLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkMenuLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
