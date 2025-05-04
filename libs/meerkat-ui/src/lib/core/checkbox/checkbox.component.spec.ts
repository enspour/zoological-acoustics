import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkCheckboxComponent } from './checkbox.component';

describe('MkCheckboxComponent', () => {
  let component: MkCheckboxComponent;
  let fixture: ComponentFixture<MkCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
