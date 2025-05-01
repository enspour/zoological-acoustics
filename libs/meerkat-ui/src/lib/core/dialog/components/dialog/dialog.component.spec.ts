import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkDialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: MkDialogComponent;
  let fixture: ComponentFixture<MkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
