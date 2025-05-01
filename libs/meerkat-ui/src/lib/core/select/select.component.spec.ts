import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkSelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: MkSelectComponent;
  let fixture: ComponentFixture<MkSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
