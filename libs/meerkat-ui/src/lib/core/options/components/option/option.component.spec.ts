import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkOptionComponent } from './option.component';

describe('OptionComponent', () => {
  let component: MkOptionComponent<any>;
  let fixture: ComponentFixture<MkOptionComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
