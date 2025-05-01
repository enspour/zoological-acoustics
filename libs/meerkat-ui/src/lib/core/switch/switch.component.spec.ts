import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkSwitchComponent } from './switch.component';

describe('MkSwitchComponent', () => {
  let component: MkSwitchComponent;
  let fixture: ComponentFixture<MkSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
