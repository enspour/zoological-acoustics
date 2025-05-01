import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkTableComponent } from './table.component';

describe('TableComponent', () => {
  let component: MkTableComponent;
  let fixture: ComponentFixture<MkTableComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
