import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseProjectDataFieldModalComponent } from './browse-project-data-field-modal.component';

describe('BrowseProjectDataFieldModalComponent', () => {
  let component: BrowseProjectDataFieldModalComponent;
  let fixture: ComponentFixture<BrowseProjectDataFieldModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseProjectDataFieldModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseProjectDataFieldModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
