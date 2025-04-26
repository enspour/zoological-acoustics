import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduInputColorComponent } from './input-color.component';

describe('KuduInputColorComponent', () => {
  let component: KuduInputColorComponent;
  let fixture: ComponentFixture<KuduInputColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduInputColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduInputColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
