import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkExpandedComponent } from './expanded.component';

describe('MkExpandedComponent', () => {
  let component: MkExpandedComponent;
  let fixture: ComponentFixture<MkExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkExpandedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
