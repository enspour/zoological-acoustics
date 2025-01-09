import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduDropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: KuduDropdownComponent;
  let fixture: ComponentFixture<KuduDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
