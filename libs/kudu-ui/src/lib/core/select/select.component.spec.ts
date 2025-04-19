import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduSelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: KuduSelectComponent<unknown>;
  let fixture: ComponentFixture<KuduSelectComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
