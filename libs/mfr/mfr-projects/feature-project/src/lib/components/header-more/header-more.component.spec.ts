import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderMoreComponent } from './header-more.component';

describe('HeaderMoreComponent', () => {
  let component: HeaderMoreComponent;
  let fixture: ComponentFixture<HeaderMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
