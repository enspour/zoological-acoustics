import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkDialogContainerComponent } from './dialog-container.component';

describe('DialogComponent', () => {
  let component: MkDialogContainerComponent;
  let fixture: ComponentFixture<MkDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkDialogContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
