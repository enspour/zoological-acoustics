import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MkIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: MkIconComponent;
  let fixture: ComponentFixture<MkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
