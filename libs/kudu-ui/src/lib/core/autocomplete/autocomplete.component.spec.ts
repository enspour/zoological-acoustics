import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduAutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: KuduAutocompleteComponent;
  let fixture: ComponentFixture<KuduAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
