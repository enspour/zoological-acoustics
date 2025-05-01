import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkToastComponent } from './toast.component';

describe('MkToastComponent', () => {
  let component: MkToastComponent;
  let fixture: ComponentFixture<MkToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
