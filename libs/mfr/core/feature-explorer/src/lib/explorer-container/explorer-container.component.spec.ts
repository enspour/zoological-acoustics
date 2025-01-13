import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorerContainerComponent } from '../explorer-container.component';

describe('ExplorerContainerComponent', () => {
  let component: ExplorerContainerComponent;
  let fixture: ComponentFixture<ExplorerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorerContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
