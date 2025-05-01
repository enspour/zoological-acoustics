import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkInputContainerComponent } from './input-container.component';

describe('InputContainerComponent', () => {
  let component: MkInputContainerComponent;
  let fixture: ComponentFixture<MkInputContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkInputContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
