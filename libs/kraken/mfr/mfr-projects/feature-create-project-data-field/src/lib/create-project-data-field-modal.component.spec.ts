import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProjectDataFieldModalComponent } from './create-project-data-field-modal.component';

describe('CreateProjectDataFieldModalComponent', () => {
  let component: CreateProjectDataFieldModalComponent;
  let fixture: ComponentFixture<CreateProjectDataFieldModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectDataFieldModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectDataFieldModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
