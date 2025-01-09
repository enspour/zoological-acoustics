import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduOptionComponent } from './option.component';

describe('OptionComponent', () => {
  let component: KuduOptionComponent<any>;
  let fixture: ComponentFixture<KuduOptionComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
