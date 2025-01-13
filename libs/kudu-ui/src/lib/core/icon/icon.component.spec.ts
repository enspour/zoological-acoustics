import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: KuduIconComponent;
  let fixture: ComponentFixture<KuduIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
