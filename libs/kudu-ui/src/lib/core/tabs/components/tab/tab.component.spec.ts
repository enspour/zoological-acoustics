import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduTabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: KuduTabComponent;
  let fixture: ComponentFixture<KuduTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
