import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkTableHeaderComponent } from './th.component';

describe('ThComponent', () => {
  let component: MkTableHeaderComponent;
  let fixture: ComponentFixture<MkTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkTableHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
