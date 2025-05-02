import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextfieldEditableComponent } from './textfield-editable.component';

describe('TextfieldEditableComponent', () => {
  let component: TextfieldEditableComponent;
  let fixture: ComponentFixture<TextfieldEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextfieldEditableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextfieldEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
