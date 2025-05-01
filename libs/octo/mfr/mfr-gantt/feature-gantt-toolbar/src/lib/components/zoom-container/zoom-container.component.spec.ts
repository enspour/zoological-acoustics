import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoomContainerComponent } from './zoom-container.component';

describe('ZoomContainerComponent', () => {
  let component: ZoomContainerComponent;
  let fixture: ComponentFixture<ZoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
