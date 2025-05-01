import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseProjectAccessModalComponent } from './browse-project-access-modal.component';

describe('BrowseProjectAccessModalComponent', () => {
  let component: BrowseProjectAccessModalComponent;
  let fixture: ComponentFixture<BrowseProjectAccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseProjectAccessModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseProjectAccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
