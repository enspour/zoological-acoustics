import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuduDialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: KuduDialogComponent;
  let fixture: ComponentFixture<KuduDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuduDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KuduDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
