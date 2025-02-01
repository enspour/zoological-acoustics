import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduInputContainerComponent } from './input-container.component';

describe('InputContainerComponent', () => {
  let component: KuduInputContainerComponent;
  let fixture: ComponentFixture<KuduInputContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduInputContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
