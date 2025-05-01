import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkAutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: MkAutocompleteComponent;
  let fixture: ComponentFixture<MkAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
