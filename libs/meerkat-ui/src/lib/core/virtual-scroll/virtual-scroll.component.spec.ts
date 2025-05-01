import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkVirtualScrollComponent } from './virtual-scroll.component';

describe('MkVirtualScrollComponent', () => {
  let component: MkVirtualScrollComponent<unknown>;
  let fixture: ComponentFixture<MkVirtualScrollComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkVirtualScrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
