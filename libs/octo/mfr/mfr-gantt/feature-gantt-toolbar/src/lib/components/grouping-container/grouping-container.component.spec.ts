import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupingContainerComponent } from './grouping-container.component';

describe('GroupingContainerComponent', () => {
  let component: GroupingContainerComponent;
  let fixture: ComponentFixture<GroupingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupingContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
