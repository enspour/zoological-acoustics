import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduDialogContainerComponent } from './dialog-container.component';

describe('DialogComponent', () => {
  let component: KuduDialogContainerComponent;
  let fixture: ComponentFixture<KuduDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduDialogContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
