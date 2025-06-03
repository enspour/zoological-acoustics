import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseTaskComponent } from './browse-task.component';

describe('BrowseTaskComponent', () => {
  let component: BrowseTaskComponent;
  let fixture: ComponentFixture<BrowseTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
