import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkMenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MkMenuComponent;
  let fixture: ComponentFixture<MkMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
