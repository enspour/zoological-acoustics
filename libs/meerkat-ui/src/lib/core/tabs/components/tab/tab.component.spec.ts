import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkTabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: MkTabComponent;
  let fixture: ComponentFixture<MkTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
